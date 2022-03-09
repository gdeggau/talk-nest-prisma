import { CategoryEntity } from '@/categories/entities/category.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ItemEntity } from './item.entity';

export class ItemCategoryEntity extends ItemEntity {
  @Exclude()
  @ApiHideProperty()
  categoryId: number;

  @Expose()
  @ApiProperty()
  category: CategoryEntity;

  constructor(partial: Partial<ItemCategoryEntity>) {
    super(partial);
  }
}
