import EventEmitter from 'events';
import { createReadStream } from 'fs';
import { FileReaderInterface } from './file-reader.interface.js';
import ConfigService from '../config/config.service.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import ConsoleLoggerService from '../logger/console-logger.service.js';

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  private logger: LoggerInterface;
  config: ConfigService;

  constructor(public filename: string) {
    super();
    this.logger = new ConsoleLoggerService();
    this.config = new ConfigService(this.logger);
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: this.config.get('KB_16'),
      encoding: 'utf-8',
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf('\n')) >= 0) {
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
