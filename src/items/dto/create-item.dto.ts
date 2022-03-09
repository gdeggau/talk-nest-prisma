import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @MaxLength(250)
  description?: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsBoolean()
  published?: boolean = false;

  @ApiProperty()
  @IsNumber()
  categoryId: number;
}
