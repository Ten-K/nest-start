import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value);
    const errors = await validate(DTO);
    if (errors.length) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
