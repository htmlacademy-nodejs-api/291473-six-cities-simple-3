import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

const VALID_IMG_FORMATS = ['.jpg', '.png'];

@ValidatorConstraint({ name: 'ValidateImgFormat' })
export class ValidateImgFormat implements ValidatorConstraintInterface {

  validate(img: string) {
    return VALID_IMG_FORMATS.some((format) => img.endsWith(format));
  }

  defaultMessage(): string {
    return `Invalid image format. Valid image formats: ${VALID_IMG_FORMATS}`;
  }
}
