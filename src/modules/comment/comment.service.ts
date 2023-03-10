import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import { Component } from '../../types/component.types.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { getNewRating } from '../../utils/common.js';
import { OfferDefaults } from '../offer/offer.constant.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) { }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info('New comment created');

    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .limit(OfferDefaults.commentsCount)
      .populate('userId')
      .populate('offerId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }

  public async incAverageRatingCount(commentId: string, newRating: number): Promise<DocumentType<CommentEntity> | null> {
    const comment = await this.commentModel.findById(commentId);
    if (comment) {
      const newRatingValue = getNewRating(comment.overallRating, comment.ratingCount, newRating);
      return this.commentModel
        .findByIdAndUpdate(commentId, {
          '$set': {
            overallRating: newRatingValue.newOverallRating,
            ratingCount: newRatingValue.newRatingCount,
            averageRating: newRatingValue.newAverageRating,
          }
        }).exec();
    } else {
      return null;
    }
  }
}
