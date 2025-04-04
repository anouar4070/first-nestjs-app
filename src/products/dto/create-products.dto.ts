import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  Length,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateProductDetailsDto {
  @IsNotEmpty()
  color: string;
  @IsNotEmpty()
  @IsInt()
  size: string;
  @IsNotEmpty()
  brand: string;
}
export class CreateProductDto {
  // ** REQUIRED

  @Length(5, 50)
  title: string;

  @IsNotEmpty()
  @Max(50) //using "@Max()" decorator, "description" become now required
  description: string;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreateProductDetailsDto)
  details: CreateProductDetailsDto;
}
