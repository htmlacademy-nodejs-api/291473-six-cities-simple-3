export default class CreateCommentDto {
  public description!: string;
  public postDate!: Date;
  public ratingCount!: number;
  public overallRating!: number;
  public averageRating!: number;
  public userId!: string;
}
