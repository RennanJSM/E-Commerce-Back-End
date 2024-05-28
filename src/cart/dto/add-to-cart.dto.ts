import { IsInt, IsPositive } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto{

    @ApiProperty({ description: 'ID of the product' })
    @IsInt()
    @IsPositive()
    productId: number;

    @ApiProperty({ description: 'Quantity of the product' })
    @IsInt()
    @IsPositive()
    quantity: number;

}