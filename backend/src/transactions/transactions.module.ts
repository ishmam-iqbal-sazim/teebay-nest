import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Transaction } from '@/common/entities/transactions.entity';
import { Product } from '@/common/entities/products.entity';
import { User } from '@/common/entities/users.entity';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
@Module({
  imports: [MikroOrmModule.forFeature([Transaction, Product, User])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
