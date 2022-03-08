import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: CategoryEntity })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return new CategoryEntity(
      await this.categoriesService.create(createCategoryDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: [CategoryEntity] })
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return categories.map((category) => new CategoryEntity(category));
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryEntity })
  async findOne(@Param('id') id: string) {
    return new CategoryEntity(await this.categoriesService.findOne(+id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CategoryEntity })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return new CategoryEntity(
      await this.categoriesService.update(+id, updateCategoryDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: CategoryEntity })
  async remove(@Param('id') id: string) {
    return new CategoryEntity(await this.categoriesService.remove(+id));
  }
}
