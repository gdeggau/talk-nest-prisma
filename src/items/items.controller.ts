import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll() {
    const items = await this.itemsService.findAll();
    return items;
  }

  @Get('drafts')
  async findAllDrafts() {
    const items = await this.itemsService.findAllDrafts();
    return items;
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.itemsService.findOne(slug);
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(slug, updateItemDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.itemsService.remove(slug);
  }
}
