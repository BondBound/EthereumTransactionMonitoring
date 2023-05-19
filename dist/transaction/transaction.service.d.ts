import { Repository } from 'typeorm';
import { TransactionEntity } from '../entity/transaction.entity';
export declare class TransactionService {
    private readonly transactionRepository;
    constructor(transactionRepository: Repository<TransactionEntity>);
    getLatestBlockNumber(): Promise<number>;
    getBlockByNumber(blockNumber: number): Promise<any>;
}
