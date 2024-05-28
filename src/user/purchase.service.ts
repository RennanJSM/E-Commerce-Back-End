import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purchase)
        private purchaseRepository: Repository<Purchase>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createPurchase(userId: string, purchase: Purchase): Promise<Purchase> {
        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber)) {
            throw new Error('userId deve ser um número válido');
        }

        const user = await this.userRepository.findOne({ where: { id: userIdNumber } });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        purchase.user = user;
        return this.purchaseRepository.save(purchase);
    }
}
