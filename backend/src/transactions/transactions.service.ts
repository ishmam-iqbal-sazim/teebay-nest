import { Injectable } from '@nestjs/common';

import { CustomTransactionsRepository } from '../common/repositories/custom-transactions.repository';

import { CustomUsersRepository } from '@/common/repositories/custom-users.repository';
import { CustomProductsRepository } from '@/common/repositories/custom-products.repository';
import { EProductAvailable } from '@/common/enums/products.enums';
import { ETransactionStatus } from '@/common/enums/transaction-statuses.enums';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly customTransactionsRepository: CustomTransactionsRepository,
    private readonly customUsersRepository: CustomUsersRepository,
    private readonly customProductsRepository: CustomProductsRepository,
  ) {}

  async getTransactionsByUserId(userId: number, status: ETransactionStatus) {
    const user = await this.customUsersRepository.findOneOrFail(userId);

    const transactions = await this.customTransactionsRepository.find(
      {
        user: user,
        status: status,
      },
      { populate: ['product'] },
    );

    return transactions;
  }

  async createBuyAndSellTransaction(userId: number, productId: number) {
    const user = await this.customUsersRepository.findOneOrFail(userId);
    const product = await this.customProductsRepository.findOneOrFail({
      id: productId,
      available: EProductAvailable.AVAILABLE,
    });

    const transaction =
      this.customTransactionsRepository.createBuyAndSellTransaction(
        user,
        product,
      );

    return transaction;
  }
}
