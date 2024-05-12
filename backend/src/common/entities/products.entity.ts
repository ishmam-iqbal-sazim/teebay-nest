import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  Enum,
  ManyToOne,
  Rel,
  t,
  OneToMany,
  Collection,
} from '@mikro-orm/core';

import { CustomBaseEntity } from './base.entity';
import { CustomProductsRepository } from '../repositories/custom-products.repository';
import {
  ECategories,
  EProductAvailable,
  ERentDuration,
} from '../enums/products.enums';
import { User } from './users.entity';
import { Transaction } from './transactions.entity';

@Entity({
  tableName: 'products',
  repository: () => CustomProductsRepository,
})
export class Product extends CustomBaseEntity {
  [EntityRepositoryType]?: CustomProductsRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ fieldName: 'title' })
  title!: string;

  @Property({ fieldName: 'description' })
  description!: string;

  @Property({ type: t.double, fieldName: 'purchase_price' })
  purchasePrice!: number;

  @Property({ type: t.double, fieldName: 'rent_price' })
  rentPrice!: number;

  @Enum({ items: () => ERentDuration, fieldName: 'rentDuration' })
  rentDuration!: ERentDuration;

  @Enum({ items: () => EProductAvailable, fieldName: 'available' })
  available!: EProductAvailable;

  @Enum({ items: () => ECategories, array: true, fieldName: 'categories' })
  categories!: ECategories[];

  @ManyToOne(() => User, {
    fieldName: 'user_id',
  })
  user!: Rel<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.product)
  transactions = new Collection<Transaction>(this);
}
