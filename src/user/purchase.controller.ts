import { Controller, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';

@ApiTags('users/:userId/purchases')
@Controller('users/:userId/purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiOperation({ summary: 'Add a purchase' })
  @ApiResponse({ status: 201, description: 'The purchase has been successfully added.' })
  @HttpCode(HttpStatus.CREATED)
  async createPurchase(@Param('userId') userId: string, @Body() purchaseData: Purchase): Promise<Purchase> {
    return this.purchaseService.createPurchase(userId, purchaseData);
  }
}
