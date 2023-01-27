import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { createOffer, getErrorMessage } from '../utils/common.js';
import DatabaseService from '../common/database-client/database.service.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { getURI } from '../utils/db.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import { CommentServiceInterface } from '../modules/comment/comment-service.interface.js';
import UserService from '../modules/user/user.service.js';
import OfferService from '../modules/offer/offer.service.js';
import CommentService from '../modules/comment/comment.service.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import { UserModel } from '../modules/user/user.entity.js';
import { Offer } from '../types/offer.type.js';
import { Comment } from '../types/comment.type.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import ConfigService from '../common/config/config.service.js';
import { CommentModel } from '../modules/comment/comment.entity.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private commentService!: CommentServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;
  config: ConfigService;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.config = new ConfigService(this.logger);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.commentService = new CommentService(this.logger, CommentModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: this.config.get('DB_PASSWORD')
    }, this.salt);

    return await this.offerService.create({
      ...offer,
      userId: user.id,
    });
  }

  private async saveComment(comment: Comment) {
    await this.commentService.create({
      ...comment
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: this.config.get('DB_PASSWORD')
    }, this.salt);
    const createdOffer = await this.saveOffer(offer);

    if (createdOffer) {
      const comment: Comment = {
        description: createdOffer.description,
        postDate: createdOffer.postDate,
        ratingCount: createdOffer.ratingCount,
        overallRating: createdOffer.overallRating,
        averageRating: createdOffer.averageRating,
        offerId: createdOffer.id,
        userId: user.id,
      };
      await this.saveComment(comment);
    }

    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, this.config.get('DB_PORT'), dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
