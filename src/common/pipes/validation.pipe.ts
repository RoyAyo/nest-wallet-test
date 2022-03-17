import {
  PipeTransform,
  Injectable,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema, Schema } from 'joi';
import { IObjectInterface } from 'definitions';

@Injectable()
export class ValidationPipe implements PipeTransform {
  message: string;

  constructor(
    private schema: Schema | ObjectSchema,
    errorMessage?: string | undefined,
  ) {
    this.message = errorMessage ?? 'Validation error creating data field';
  }

  transform(value: IObjectInterface): IObjectInterface | BadRequestException {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      const { details } = error;
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: Array.isArray(details)
          ? this.convertErrorsToKeyValues(details)
          : details,
        message: this.message,
      });
    }
    return value;
  }

  private convertErrorsToKeyValues(
    details: Array<IObjectInterface>,
  ): IObjectInterface {
    const formatted = {};
    details.forEach((detail: IObjectInterface) => {
      formatted[detail.path[0] || detail.context?.label] = detail.message;
    });
    return formatted;
  }
}
