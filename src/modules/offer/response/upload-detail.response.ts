import { Expose } from 'class-transformer';

export default class UploadDetailResponse {
  @Expose()
  public detailImagePath!: string[];
}
