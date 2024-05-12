import { ConfigModule } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import ormConfig from './db/db.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),

    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
    }),

    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
