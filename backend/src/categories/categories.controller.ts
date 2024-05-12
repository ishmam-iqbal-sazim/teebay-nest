import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getCategories() {
    const categories = [
      'ELECTRONICS',
      'FURNITURE',
      'HOME APPLIANCES',
      'SPORTING GOODS',
      'OUTDOOR',
      'TOYS',
    ];

    return categories;
  }
}
