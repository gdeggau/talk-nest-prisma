import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CategoryEntity implements Category {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
}
