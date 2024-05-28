import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.cartItems)
    user: User;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    quantity: number;
}
