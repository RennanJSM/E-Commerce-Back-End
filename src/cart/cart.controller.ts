import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './cart-item.entity';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    @ApiOperation({ summary: 'Add a product to the cart' })
    @ApiResponse({ status: 201, description: 'The product has been successfully added.' })
    addToCart(@Body() addToCartDto: AddToCartDto): Promise<CartItem> {
        const cartItem = new CartItem();
        cartItem.id = addToCartDto.productId;
        cartItem.quantity = addToCartDto.quantity;
        return this.cartService.addToCart(addToCartDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products in the cart' })
    @ApiResponse({ status: 201, description: 'Return all products in the cart' })
    findAll(): Promise<CartItem[]> {
        return this.cartService.findAll();
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a product in the cart by id' })
    @ApiResponse({ status: 201, description: 'The product has been successfully updated' })
    updateCartItem(@Param('id', ParseIntPipe) id: number, @Body() updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
        return this.cartService.updateCartItem(id, updateCartItemDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product from the cart by id' })
    @ApiResponse({ status: 200, description: 'The product has been successfully deleted from the cart' })
    removeCartItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.cartService.removeCartItem(id);
    }

    @Post('finalize/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Finalize purchase and clear the cart' })
    @ApiResponse({ status: 200, description: 'The purchase has been successfully finalized and the cart cleared.' })
    finalizePurchase(@Param('userId') userId: string): Promise<void> {
        const numericUserId = parseInt(userId, 10);
        return this.cartService.finalizePurchase(numericUserId);
}
}
