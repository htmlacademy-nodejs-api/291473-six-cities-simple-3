import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: ModelType<CommentEntity>
  ) { }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.userId}`);
    return result;
  }

  public async findById(commentId: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findById(commentId).exec();
  }
}


