export class CreateItemDto {
  name: string;
  description?: string;
  price: number;
  slug: string;
  published?: boolean = false;
  categoryId: number;
}
