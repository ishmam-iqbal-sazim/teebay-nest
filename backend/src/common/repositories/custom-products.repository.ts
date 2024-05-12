import { EntityRepository } from '@mikro-orm/postgresql';

import {
  CreateProductDto,
  UpdateProductDtoWithAvailable,
} from '@/products/products.dtos';

import { Product } from '../entities/products.entity';
import { User } from '../entities/users.entity';
import { EProductAvailable } from '../enums/products.enums';

export class CustomProductsRepository extends EntityRepository<Product> {
  public async createByUserId(user: User, createProductDto: CreateProductDto) {
    const product = this.create({
      ...createProductDto,
      available: EProductAvailable.AVAILABLE,
      user,
    });

    this.assign(product, { user });

    await this.em.persistAndFlush([product]);

    return product;
  }

  public async update(
    product: Product,
    updateProductDto: UpdateProductDtoWithAvailable,
  ) {
    this.assign(product, { ...updateProductDto });

    await this.em.persistAndFlush([product]);

    return product;
  }
}
