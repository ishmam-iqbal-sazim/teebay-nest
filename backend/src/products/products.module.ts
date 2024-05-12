import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Product } from '@/common/entities/products.entity';
import { User } from '@/common/entities/users.entity';
import { Transaction } from '@/common/entities/transactions.entity';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [MikroOrmModule.forFeature([Product, User, Transaction])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
