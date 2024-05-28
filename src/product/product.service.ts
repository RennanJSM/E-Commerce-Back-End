import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    this.logger.log('Finding all products');
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: {id} });
  }

  create(product: CreateProductDto): Promise<Product> {
    this.logger.log(`Creating product: ${JSON.stringify(product)}`);
    const newProduct = this.productsRepository.create(product);
    return this.productsRepository.save(newProduct);
  }

  async update(id: number, product: UpdateProductDto): Promise<Product> {
    await this.productsRepository.update(id, product);
    return this.productsRepository.findOne({ where: {id} });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
