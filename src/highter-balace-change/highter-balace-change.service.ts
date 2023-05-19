import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entity/transaction.entity';

@Injectable()
export class HigherBalanceChangeService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async getHighestBalanceChange() {
    try {
      const latestBlock = await this.transactionRepository
        .createQueryBuilder('transaction')
        .select('MAX(transaction.blockNumber)', 'maxBlockNumber')
        .getRawOne();

      const maxBlockNumber = latestBlock.maxBlockNumber;
      const minBlockNumber = maxBlockNumber - 100;

      const queryBuilder =
        this.transactionRepository.createQueryBuilder('transaction');
      queryBuilder
        .select('transaction.from', 'from')
        .addSelect('transaction.to', 'to')
        .addSelect(`SUM(CAST(transaction.value AS FLOAT))`, 'value')
        .where(
          'transaction.blockNumber BETWEEN :minBlockNumber AND :maxBlockNumber',
          { minBlockNumber, maxBlockNumber },
        )
        .groupBy('transaction.from, transaction.to')
        .orderBy('value', 'DESC')
        .limit(1);

      const highestBalanceChange = await queryBuilder.getRawOne();

      return {
        wallet: highestBalanceChange.from || highestBalanceChange.to,
        value: highestBalanceChange.value,
      };
    } catch (error) {
      throw new Error(`Не удалось получить адрес: ${error.message}`);
    }
  }
}
