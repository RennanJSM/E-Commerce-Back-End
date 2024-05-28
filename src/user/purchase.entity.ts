import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    totalAmount: number;

    @ManyToOne(() => User, user => user.purchases)
    user: User;

    @OneToMany(() => PurchaseItem, purchaseItem => purchaseItem.purchase)
    items: PurchaseItem[];
}

@Entity()
export class PurchaseItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Purchase, purchase => purchase.items)
    purchase: Purchase;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    quantity: number;
}
