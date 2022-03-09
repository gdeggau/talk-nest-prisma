import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: createItemDto,
    });
  }

  findAll() {
    return this.prisma.item.findMany({
      where: {
        published: true,
      },
    });
  }

  findAllDrafts() {
    return this.prisma.item.findMany({
      where: {
        published: false,
      },
    });
  }

  findOne(slug: string) {
    return this.prisma.item.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
      },
    });
  }

  update(slug: string, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      data: updateItemDto,
      where: {
        slug,
      },
    });
  }

  remove(slug: string) {
    return this.prisma.item.delete({
      where: {
        slug,
      },
    });
  }
}
