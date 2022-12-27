// import { readFileSync } from 'fs';
// import { Offer } from '../../types/offer.type.js';
import EventEmitter from 'events';
import { createReadStream } from 'fs';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {

  constructor(public filename: string) {
    super();
  }

  public async read():Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: 16384, // 16KB
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

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);
  }


  // private rawData = '';

  // constructor(public filename: string) { }

  // public read(): void {
  //   this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  // }

  // public toArray(): Offer[] {
  //   if (!this.rawData) {
  //     return [];
  //   }

  //   return this.rawData
  //     .split('\n')
  //     .filter((row) => row.trim() !== '')
  //     .map((line) => line.split('\t'))
  //     .map(([title, description, postDate, city, previewImagePath, detailImagePath, premium, rating,
  //       HousingType, roomsNumber, guestsNuber, rentPrice, amenities, name, email, avatarPath, password,
  //       type, commentsCount, coordinates,]) => ({
  //       title,
  //       description,
  //       postDate: new Date(postDate),
  //       city,
  //       previewImagePath,
  //       detailImagePath: detailImagePath.split(';'),
  //       premium: premium === 'true',
  //       rating,
  //       HousingType,
  //       roomsNumber: Number.parseInt(roomsNumber, 10),
  //       guestsNuber: Number.parseInt(guestsNuber, 10),
  //       rentPrice: Number.parseInt(rentPrice, 10),
  //       amenities: amenities.split(';'),
  //       user: { name, email, avatarPath, password, type },
  //       commentsCount: Number.parseInt(commentsCount, 10),
  //       coordinates: {
  //         latitude: coordinates.split(';')[0],
  //         longitude: coordinates.split(';')[1]
  //       },
  //     }));
  // }
}
