import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('users/:userId/products/:productId/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('buy')
  async createBuyAndSellTransaction(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const newTransaction = this.transactionsService.createBuyAndSellTransaction(
      userId,
      productId,
    );

    return newTransaction;
  }
}
