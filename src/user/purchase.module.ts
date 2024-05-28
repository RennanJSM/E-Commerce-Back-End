import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { User } from '../user/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, User]), 
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
  exports: [PurchaseService], 
})
export class PurchaseModule {}
