import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @MaxLength(250)
  description?: string;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  slug: string;

  @IsBoolean()
  published?: boolean = false;

  @IsNumber()
  categoryId: number;
}
