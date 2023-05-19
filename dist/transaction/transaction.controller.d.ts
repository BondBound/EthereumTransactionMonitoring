import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    getLatestBlockNumber(): Promise<{
        latestBlockNumber: number;
        error?: undefined;
    } | {
        error: string;
        latestBlockNumber?: undefined;
    }>;
    getBlockByNumber(blockNumber: number): Promise<any>;
}
