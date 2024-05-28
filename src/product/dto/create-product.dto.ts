import { IsString, IsDecimal, IsUrl } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty({ description: 'Name of the product' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Description of the product' })
    @IsDecimal()
    price: number;

    @ApiProperty({ description: 'Price of the product' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'URL of the product image' })
    @IsUrl()
    imageUrl: string;

}