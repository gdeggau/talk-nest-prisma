import { ApiProperty } from '@nestjs/swagger';
import { Item } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Expose, Transform } from 'class-transformer';

export class ItemEntity implements Item {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string | null;

  @Expose()
  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: Number })
  price: Decimal;

  @Expose()
  @ApiProperty()
  slug: string;

  @Expose()
  @ApiProperty()
  published: boolean;

  @Expose()
  @ApiProperty()
  categoryId: number;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }
}
