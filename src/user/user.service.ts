import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name)
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: User): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    this.logger.log('Finding all products');
    return this.userRepository.find();
  }
  
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
