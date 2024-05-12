import { Injectable } from '@nestjs/common';

import { CustomUsersRepository } from '@/common/repositories/custom-users.repository';
import { EProductAvailable } from '@/common/enums/products.enums';
import { ETransactionStatus } from '@/common/enums/transaction-statuses.enums';

import { Product } from '../common/entities/products.entity';
import { CustomProductsRepository } from '../common/repositories/custom-products.repository';
import { CustomTransactionsRepository } from '../common/repositories/custom-transactions.repository';
import { CreateProductDto, UpdateProductDto } from './products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    private readonly customProductsRepository: CustomProductsRepository,
    private readonly customUsersRepository: CustomUsersRepository,
    private readonly customTransactionsRepository: CustomTransactionsRepository,
  ) {}

  async findAllByUserId(userId: number) {
    const user = await this.customUsersRepository.findOneOrFail(userId);

    const products = await this.customProductsRepository.find({
      user,
      available: EProductAvailable.AVAILABLE,
    });

    return products;
  }

  async findAllByUserIdAndStatus(userId: number, status: ETransactionStatus) {
    const user = await this.customUsersRepository.findOneOrFail(userId);

    const transactions = await this.customTransactionsRepository.find(
      {
        user,
        status,
      },
      { populate: ['product'] },
    );

    const products = transactions?.map(
      (transaction) => transaction.product as Product,
    );

    return products;
  }

  async findAllProducts(userId: number) {
    const user = await this.customUsersRepository.findOneOrFail(userId);

    const products = await this.customProductsRepository.find({
      user: { $ne: user },
      available: EProductAvailable.AVAILABLE,
    });

    return products;
  }

  async create(userId: number, createProductDto: CreateProductDto) {
    const user = await this.customUsersRepository.findOneOrFail(userId);

    const product = this.customProductsRepository.createByUserId(
      user,
      createProductDto,
    );

    return product;
  }

  async update(id: number, userId: number, updateProductDto: UpdateProductDto) {
    await this.customUsersRepository.findOneOrFail(userId);

    const product = await this.customProductsRepository.findOneOrFail(id);

    const updatedProduct = this.customProductsRepository.update(
      product,
      updateProductDto,
    );

    return updatedProduct;
  }

  async delete(id: number, userId: number) {
    await this.customUsersRepository.findOneOrFail(userId);

    const product = await this.customProductsRepository.findOneOrFail(id);

    await this.customProductsRepository.nativeDelete(product);
  }
}
