import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ItemEntity } from './entities/item.entity';
import { ItemCategoryEntity } from './entities/item-category.entity';
import { CategoryEntity } from '@/categories/entities/category.entity';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ItemEntity })
  async create(@Body() createItemDto: CreateItemDto) {
    return new ItemEntity(await this.itemsService.create(createItemDto));
  }

  @Get()
  @ApiOkResponse({ type: [ItemEntity] })
  async findAll() {
    const items = await this.itemsService.findAll();
    return items.map((item) => new ItemEntity(item));
  }

  @Get('drafts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ItemEntity] })
  async findAllDrafts() {
    const items = await this.itemsService.findAllDrafts();
    return items.map((item) => new ItemEntity(item));
  }

  @Get(':slug')
  @ApiOkResponse({ type: ItemCategoryEntity })
  async findOne(@Param('slug') slug: string) {
    const item = await this.itemsService.findOne(slug);
    item.category = new CategoryEntity(item.category);
    return new ItemCategoryEntity(item);
  }

  @Patch(':slug')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity })
  async update(
    @Param('slug') slug: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return new ItemEntity(await this.itemsService.update(slug, updateItemDto));
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity })
  async remove(@Param('slug') slug: string) {
    return new ItemEntity(await this.itemsService.remove(slug));
  }
}
