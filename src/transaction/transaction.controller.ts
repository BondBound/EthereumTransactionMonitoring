import { Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('latest-block')
  async getLatestBlockNumber() {
    try {
      const latestBlockNumber =
        await this.transactionService.getLatestBlockNumber();
      return { latestBlockNumber };
    } catch (error) {
      throw new Error(
        `Не удалось получить последний номер блока ${error.message}`,
      );
    }
  }

  @Get(':blockNumber')
  async getBlockByNumber(@Param('blockNumber') blockNumber: number) {
    try {
      const block = await this.transactionService.getBlockByNumber(blockNumber);
      return block;
    } catch (error) {
      throw new Error(
        `Не удалось получить блок ${blockNumber}: ${error.message}`,
      );
    }
  }

  @Post('save')
  async saveTransactions() {
    try {
      await this.transactionService.saveTransactions();
      return 'Транзакции успешно сохранены';
    } catch (error) {
      throw new Error(`Ошибка при сохранении транзакций ${error.message}`);
    }
  }
}
