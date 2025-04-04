import {IsNotEmpty, Length, Max} from 'class-validator'

export class CreateProductDto {
   // ** REQUIRED

  @Length(5, 50)
  title: string;
  @IsNotEmpty()
  @Max(50)  //using "@Max()" decorator, "description" become now required
  description: string;
}