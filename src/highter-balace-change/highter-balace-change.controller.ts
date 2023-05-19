import { Controller, Get } from '@nestjs/common';
import { HigherBalanceChangeService } from './highter-balace-change.service';

@Controller('higher-balance-change')
export class HigherBalanceChangeController {
  constructor(
    private readonly higherBalanceChangeService: HigherBalanceChangeService,
  ) {}

  @Get('address')
  async getAddressWithMaxBalanceChange() {
    try {
      const highestBalanceChange =
        await this.higherBalanceChangeService.getHighestBalanceChange();
      return highestBalanceChange;
    } catch (error) {
      throw new Error(
        `Не удалось получить адрес с наибольшим изменением баланса ${error.message}`,
      );
    }
  }
}
