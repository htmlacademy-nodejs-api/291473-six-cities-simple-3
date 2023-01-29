import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import OfferResponse from './response/offer.response.js';
import { fillDTO } from '../../utils/common.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Post, handler: this.updateById });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteById });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.findById });

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offerResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    const result = await this.offerService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferResponse, result)
    );
  }

  public async updateById({ params, body }: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response): Promise<void> {

    const result = await this.offerService.updateById(params.offerId as string, body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferResponse, result)
    );
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    await this.offerService.deleteById(req.params.offerId as string);
    this.send(res, StatusCodes.OK, null);
  }

  public async findById(req: Request, res: Response): Promise<void> {

    const offer = await this.offerService.findById(req.params.offerId);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.send(res, StatusCodes.OK, offerResponse);
  }
}

