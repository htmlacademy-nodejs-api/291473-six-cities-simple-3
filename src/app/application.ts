import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';

// tmp - временное решение для проверки сценариев (поиск пользователя, поиск предложения и т.п.)
import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js'; //tmp
import { UserServiceInterface } from '../modules/user/user-service.interface.js'; //tmp
import { CommentServiceInterface } from '../modules/comment/comment-service.interface.js'; //tmp

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,

    @inject(Component.OfferServiceInterface) private offerService: OfferServiceInterface, //tmp
    @inject(Component.UserServiceInterface) private userService: UserServiceInterface, //tmp
    @inject(Component.CommentServiceInterface) private commentService: CommentServiceInterface //tmp
  ) { }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $SALT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    const offer = await this.offerService.findById('63ca49d88615bd4f8c616a56'); //tmp
    const user = await this.userService.findByEmail('scarlett@dka.local'); //tmp
    const comment = await this.commentService.findByOfferId('63ca49d88615bd4f8c616a56'); //tmp

    console.log(offer); //tmp
    console.log(user); //tmp
    console.log(comment); //tmp

  }
}
