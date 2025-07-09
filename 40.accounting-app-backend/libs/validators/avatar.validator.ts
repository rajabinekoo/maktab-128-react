import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AvatarValidationPipe implements PipeTransform {
  private readonly validTypes = ['png', 'jpg', 'jpeg'];
  private readonly fileName = 'Avatar';

  private validateFile(file: Express.Multer.File) {
    if (!file) return null;
    const splittedMimeType = file.mimetype.split('/');
    const fileType = splittedMimeType[0];
    const fileFormat = splittedMimeType[1];
    if (fileType !== 'image') {
      throw new BadRequestException(
        `${this.fileName} should be ${this.validTypes.join(' | ')}`,
      );
    }
    if (!this.validTypes.includes(fileFormat)) {
      throw new BadRequestException(
        `${this.fileName} should be ${this.validTypes.join(' | ')}`,
      );
    }
    const mbSize = Number((file.size / Math.pow(1024, 2)).toFixed(1));
    const maxMbSize = Number(process.env['MAX_AVATAR_SIZE']);
    if (mbSize > maxMbSize) {
      throw new BadRequestException(
        `${this.fileName} size should be under ${maxMbSize}mb`,
      );
    }
    return file;
  }

  public transform(value: {
    file: Express.Multer.File[];
  }): Express.Multer.File | null {
    return this.validateFile(value?.file?.[0]);
  }
}
