import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../entity/transaction.entity.js';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { HigherBalanceChangeController } from '../highter-balace-change/highter-balace-change.controller';
import { HigherBalanceChangeService } from '../highter-balace-change/highter-balace-change.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [TransactionController, HigherBalanceChangeController],
  providers: [TransactionService, HigherBalanceChangeService],
})
export class TransactionModule {}
