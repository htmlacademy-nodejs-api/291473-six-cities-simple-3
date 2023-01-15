import { defaultClasses, Ref } from '@typegoose/typegoose';
import typegoose, { getModelForClass } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {

  @prop({
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 1024,
  })
  public description!: string;

  @prop({
    required: true,
  })
  public postDate!: Date;

  @prop({
    required: true,
    min: 1,
    max: 5,
  })
  public rating!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
