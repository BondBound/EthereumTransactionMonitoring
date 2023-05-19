"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const transaction_entity_1 = require("./entity/transaction.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: false,
    logging: false,
    entities: [transaction_entity_1.TransactionEntity],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map