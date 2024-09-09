import { Optional } from "@nestjs/common";
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ProductDTO {
    
    @Optional()
    productId: number;

    @IsNotEmpty({ message: 'Please enter a valid product code' })
    @IsString()
    @MaxLength(6, { message: 'Product code field must be at most 6 characters long' })
    @MinLength(6, { message: 'Product code field must be at least 6 characters long' })
    @Matches(/^[0-9]+$/, { message: 'Product code field must contain only digits' })
    productCode: string;
  
    @IsNotEmpty({ message: 'Please enter a valid product name' })
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, { message: 'Product name field should contain only alphabetic character' })
    brand: string;
  
    @IsNotEmpty({ message: 'Please enter the product size' })
    @IsString()
    @Matches(/^[0-9]+$/, { message: 'Product size field must contain only digits' })
    size: string;
  
    @IsNotEmpty({ message: 'Please enter a valid product color' })
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, { message: 'Product color field should contain only alphabetic character' })
    color: string;
  
    @IsNotEmpty({ message: 'Please enter a product quantity' })
    @IsString()
    @Matches(/^[0-9]+$/, { message: 'Product quantity field must contain only digits' })
    productQuantity: number;

    @IsNotEmpty({ message: 'Please enter a product price' })
    @IsString()
    @Matches(/^[0-9]+$/, { message: 'Product price field must contain only digits' })
    productPrice: number;

    @Optional()
    orders: any;

}


export class UpdateDTO {

    @Optional()
    productId: number;

    @Optional()
    productCode: string;
  
    @Optional()
    brand: string;
  
    @Optional()
    size: string;
  
    @Optional()
    color: string;
  
    @Optional()
    productQuantity: number;

    @Optional()
    productPrice: number;

    @Optional()
    filename: string;

}