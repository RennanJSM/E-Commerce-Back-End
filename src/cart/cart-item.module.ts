import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from '../product/product.module'; 
import { PurchaseModule } from '../user/purchase.module'; 
import { UserModule } from '../user/user.module'; 
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, User]),
    ProductModule,
    PurchaseModule,
    UserModule, 
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartItemModule {}
