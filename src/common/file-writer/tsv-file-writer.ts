import { createWriteStream, WriteStream } from 'fs';
import { FileWriterInterface } from './file-writer.interface.js';
import ConfigService from '../config/config.service.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import ConsoleLoggerService from '../logger/console-logger.service.js';

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;
  private logger: LoggerInterface;
  config: ConfigService;

  constructor(public readonly filename: string) {
    this.logger = new ConsoleLoggerService();
    this.config = new ConfigService(this.logger);

    this.stream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: 2 ** this.config.get('KB_64'),
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
