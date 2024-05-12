import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';

import { CustomBaseEntity } from './base.entity';
import { Product } from './products.entity';
import { User } from './users.entity';
import { Optional } from '@nestjs/common';
import { CustomTransactionsRepository } from '../repositories/custom-transactions.repository';
import { ETransactionStatus } from '../enums/transaction-statuses.enums';

@Entity({
  tableName: 'transactions',
  repository: () => CustomTransactionsRepository,
})
export class Transaction extends CustomBaseEntity {
  [EntityRepositoryType]?: CustomTransactionsRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Enum({ items: () => ETransactionStatus, fieldName: 'status' })
  status: ETransactionStatus;

  @ManyToOne(() => Product, {
    fieldName: 'product_id',
  })
  product!: Rel<Product>;

  @ManyToOne(() => User, {
    fieldName: 'user_id',
  })
  user!: Rel<User>;

  @Optional()
  @Property({ fieldName: 'rental_start', nullable: true })
  rentalStart!: Date | null;

  @Optional()
  @Property({ fieldName: 'rental_end', nullable: true })
  rentalEnd!: Date | null;
}
