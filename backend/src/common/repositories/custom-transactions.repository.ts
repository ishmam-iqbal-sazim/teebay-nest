import { EntityRepository } from '@mikro-orm/postgresql';

import { Transaction } from '../entities/transactions.entity';
import { Product } from '../entities/products.entity';
import { User } from '../entities/users.entity';
import { EProductAvailable } from '../enums/products.enums';
import { ETransactionStatus } from '../enums/transaction-statuses.enums';

export class CustomTransactionsRepository extends EntityRepository<Transaction> {
  private productsRepository = this.em.getRepository(Product);

  public async createBuyAndSellTransaction(user: User, product: Product) {
    const buyTransaction = this.create({
      user,
      product,
      status: ETransactionStatus.BOUGHT,
    });

    const sellTransaction = this.create({
      user: product.user,
      product,
      status: ETransactionStatus.SOLD,
    });

    await this.productsRepository.update(product, {
      available: EProductAvailable.NOT_AVAILABLE,
    });

    this.assign(buyTransaction, { user, product });
    this.assign(sellTransaction, { user: product.user, product });

    await this.em.persistAndFlush([buyTransaction, sellTransaction]);

    return buyTransaction;
  }
}
