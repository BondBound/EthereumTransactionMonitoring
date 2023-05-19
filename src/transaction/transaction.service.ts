import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { TransactionEntity } from '../entity/transaction.entity.js';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.saveTransactions();
  }

  async getLatestBlockNumber() {
    try {
      const response = await axios.get(
        'https://api.etherscan.io/api?module=proxy&action=eth_blockNumber',
      );
      const latestBlockHex = response.data.result;
      const latestBlockNumber = parseInt(latestBlockHex, 16);
      return latestBlockNumber;
    } catch {
      throw new Error('Не удалось получить номер последнего блока');
    }
  }

  async getBlockByNumber(blockNumber: number) {
    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x${blockNumber.toString(
          16,
        )}&boolean=true`,
      );
      const block = response.data.result;
      return block;
    } catch (error) {
      throw new Error(
        `Не удалось получить блок ${blockNumber}: ${error.message}`,
      );
    }
  }

  async saveTransactions() {
    try {
      const latestBlockNumber = await this.getLatestBlockNumber();
      const startBlockNumber = latestBlockNumber - 100;

      const transactionsToSave = [];

      for (
        let blockNumber = startBlockNumber;
        blockNumber <= latestBlockNumber;
        blockNumber++
      ) {
        const block = await this.getBlockByNumber(blockNumber);
        const transactions = block.transactions || [];

        transactions.forEach((transaction) => {
          const { from, to, value } = transaction;
          if (from && to && value) {
            const transactionEntity = new TransactionEntity();
            transactionEntity.blockNumber = blockNumber;
            transactionEntity.from = from;
            transactionEntity.to = to;
            transactionEntity.value = value;

            transactionsToSave.push(transactionEntity);
          } else {
            console.warn('Пропущена транзакция с пустыми полями:', {
              to: transaction.to,
              from: transaction.from,
              value: transaction.value,
            });
          }
        });
      }

      await this.transactionRepository.save(transactionsToSave);

      console.error('Все транзакции успешно сохранены');
    } catch (error) {
      throw new Error(`Не удалось сохранить транзакции: ${error.message}`);
    }
  }
}
