import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CartItemModule } from './cart/cart-item.module';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './user/purchase.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductModule,
    CartItemModule,
    UserModule,
    PurchaseModule,
  ],
})
export class AppModule {}
