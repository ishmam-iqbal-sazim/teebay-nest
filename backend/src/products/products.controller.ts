import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ETransactionStatus } from '@/common/enums/transaction-statuses.enums';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dtos';

@Controller('users/:userId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAllByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('status', new ParseEnumPipe(ETransactionStatus, { optional: true }))
    status?: ETransactionStatus,
  ) {
    if (status) {
      const products = this.productsService.findAllByUserIdAndStatus(
        userId,
        status,
      );

      return products;
    } else {
      const products = this.productsService.findAllByUserId(userId);

      return products;
    }
  }

  @Get('1')
  async findAllProducts(@Param('userId', ParseIntPipe) userId: number) {
    const products = this.productsService.findAllProducts(userId);

    return products;
  }

  @Post()
  async createProduct(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    const newProduct = this.productsService.create(userId, createProductDto);

    return newProduct;
  }

  @Patch(':id')
  async updateProduct(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = this.productsService.update(
      id,
      userId,
      updateProductDto,
    );

    return updatedProduct;
  }

  @Delete(':id')
  async deleteProduct(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.productsService.delete(id, userId);

    return;
  }
}
