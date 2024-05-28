import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Product } from '../product/product.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PurchaseService } from '../user/purchase.service';
import { Purchase, PurchaseItem } from '../user/purchase.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartItem)
        private cartRepository: Repository<CartItem>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private purchaseService: PurchaseService,
    ) {}

    async addToCart(addToCartDto: AddToCartDto): Promise<CartItem> {
        const product = await this.productRepository.findOneBy({ id: addToCartDto.productId });

        if (!product) {
            throw new Error('Produto não encontrado');
        }

        const cartItem = this.cartRepository.create({
            product,
            quantity: addToCartDto.quantity,
        });

        return this.cartRepository.save(cartItem);
    }

    findAll(): Promise<CartItem[]> {
        return this.cartRepository.find({ relations: ['product'] });
    }

    async updateCartItem(id: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
        const cartItem = await this.cartRepository.findOne({ where: { id }, relations: ['product'] });

        if (!cartItem) {
            throw new Error('Item do carrinho não encontrado');
        }

        if (updateCartItemDto.productId) {
            cartItem.product = await this.productRepository.findOneBy({ id: updateCartItemDto.productId });
        }

        if (updateCartItemDto.quantity) {
            cartItem.quantity = updateCartItemDto.quantity;
        }

        return this.cartRepository.save(cartItem);
    }

    async removeCartItem(id: number): Promise<void> {
        await this.cartRepository.delete(id);
    }

    async finalizePurchase(userId: number): Promise<void> { 
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['cartItems'] });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const cartItems = user.cartItems;
        if (cartItems.length === 0) {
            throw new Error('Carrinho está vazio');
        }

        const purchase = new Purchase();
        purchase.user = user;
        purchase.totalAmount = 0; 

        const purchaseItems: PurchaseItem[] = cartItems.map(item => ({
            id: item.id, 
            purchase: purchase, 
            product: item.product,
            quantity: item.quantity,
        }));
        purchase.items = purchaseItems;

        await this.purchaseService.createPurchase(userId.toString(), purchase);

        for (const item of cartItems) {
            await this.cartRepository.remove(item);
        }
    }
}
