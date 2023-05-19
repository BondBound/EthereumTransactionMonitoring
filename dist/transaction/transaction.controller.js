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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async getLatestBlockNumber() {
        try {
            const latestBlockNumber = await this.transactionService.getLatestBlockNumber();
            return { latestBlockNumber };
        }
        catch (error) {
            return { error: 'Не удалось получить последний номер блока' };
        }
    }
    async getBlockByNumber(blockNumber) {
        try {
            const block = await this.transactionService.getBlockByNumber(blockNumber);
            return block;
        }
        catch (error) {
            throw new Error(`Не удалось получить блок ${blockNumber}`);
        }
    }
};
__decorate([
    (0, common_1.Get)('latest-block'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getLatestBlockNumber", null);
__decorate([
    (0, common_1.Get)(':blockNumber'),
    __param(0, (0, common_1.Param)('blockNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getBlockByNumber", null);
TransactionController = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map