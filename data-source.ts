import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { TransactionEntity } from './src/entity/transaction.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  logging: false,
  entities: [TransactionEntity],
  migrations: ['src/migration/**/*.ts'],
  subscribers: [],
});
