import { Module } from '@nestjs/common';
import { HigherBalanceChangeController } from './highter-balace-change.controller';
import { HigherBalanceChangeService } from './highter-balace-change.service';
import { TransactionController } from '../transaction/transaction.controller';
import { TransactionService } from '../transaction/transaction.service';

@Module({
  controllers: [HigherBalanceChangeController, TransactionController],
  providers: [HigherBalanceChangeService, TransactionService],
})
export class HigherBalanceChangeModule {}
