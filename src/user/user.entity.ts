import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from '../cart/cart-item.entity';
import { Purchase } from '../user/purchase.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => CartItem, cartItem => cartItem.user)
    cartItems: CartItem[];

    @OneToMany(() => Purchase, purchase => purchase.user)
    purchases: Purchase[];
}
