import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: [path.join(__dirname, 'entity', '*.*s')],
        logging: [
          'query',
          'error',
          'schema',
          'warn',
          'info',
          'log',
          'migration',
        ],
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
      }),
    }),
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
