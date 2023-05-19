"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const transaction_entity_1 = require("../entity/transaction.entity");
let TransactionService = class TransactionService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async getLatestBlockNumber() {
        try {
            const response = await axios_1.default.get('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber');
            const latestBlockHex = response.data.result;
            const latestBlockNumber = parseInt(latestBlockHex, 16);
            return latestBlockNumber;
        }
        catch (_a) {
            throw new Error('Не удалось получить номер последнего блока');
        }
    }
    async getBlockByNumber(blockNumber) {
        try {
            const response = await axios_1.default.get(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true`);
            const block = response.data.result;
            return block;
        }
        catch (_a) {
            throw new Error(`Не удалось получить блок ${blockNumber}`);
        }
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(transaction_entity_1.TransactionEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map