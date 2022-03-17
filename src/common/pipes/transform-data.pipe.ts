import { PipeTransform, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IObjectInterface } from 'definitions';

@Injectable()
export class TransformPayloadPipe implements PipeTransform {
  message: string;

  constructor(private model: any) {}

  transform(value: IObjectInterface): IObjectInterface {
    return plainToClass(this.model, value, { excludeExtraneousValues: true });
  }
}
