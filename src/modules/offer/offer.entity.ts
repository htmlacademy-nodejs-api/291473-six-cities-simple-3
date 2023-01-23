import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { housingType } from '../../types/housing-type.enum.js';
import { Coordinates } from '../../types/coordinates.type.js';
import { UserEntity } from '../user/user.entity.js';
import { City } from '../../types/city.enum.js';
import { Amenities } from '../../types/amenities.enum.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({
    trim: true,
    required: true,
    minlength: 10,
    maxlength: 100,
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: 20,
    maxlength: 1024,
  })
  public description!: string;

  @prop({
    required: true,
  })
  public postDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: City,
  })
  public city!: string;

  @prop({
    required: true,
  })
  public previewImagePath!: string;

  @prop({
    required: true,
  })
  public detailImagePath!: string[];

  @prop({
    required: true,
  })
  public premium!: boolean;

  @prop({
    required: true,
  })
  public ratingCount!: number;

  @prop({
    required: true,
  })
  public rating!: number;

  @prop({
    required: true,
    min: 1,
    max: 5,
  })
  public averageRating!: number;

  @prop({
    required: true,
    type: () => String,
  })
  public housingType!: housingType;

  @prop({
    required: true,
    min: 1,
    max: 8,
  })
  public roomsNumber!: number;

  @prop({
    required: true,
    min: 1,
    max: 10,
  })
  public guestsNuber!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000,
  })
  public rentPrice!: number;

  @prop({
    required: true,
    type: () => String,
    enum: Amenities,
  })
  public amenities!: string[];

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({
    required: true,
  })
  public coordinates!: Coordinates;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
