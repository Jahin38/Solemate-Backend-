import { Optional } from "@nestjs/common";
import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class ManagerDTO {
    @Optional()
    managerId: string;

    @IsNotEmpty({ message: 'Please enter a valid name' })
    @IsString()
    @Matches(/^[^\d]+$/, { message: 'Name field should not contain any numbers' })
    @Matches(/^[A-Za-z\s]+$/, { message: 'Name field should contain only alphabetic characters' })
    name: string;

    @IsNotEmpty({ message: 'enter a valid email address' })
    @IsEmail({}, { message: 'Invalid email format' })
    @Matches(/.*@.*\.com$/, { message: 'Email must contain @, ., com' })
    email: string;

    @IsNotEmpty({ message: 'userName is required' })
    @Length(8, 100, {
      message: 'userName length must be between 8 and 100 characters',
    })
    @IsString({ message: 'userName must be a string' })
    username: string;

    @IsNotEmpty({ message: 'password is required' })
    @IsString({ message: 'password must be a string' })
    @Matches(/.*[0-9].*/, { message: 'Password must contain one of the numeric character' })
    @Matches(/[#@\$&]/, { message: 'Password must contain one of the special characters (@ or # or $ or &)' })
    @Matches(/^.{8,}$/, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsNotEmpty({ message: 'enter your address' })
    @IsString()
    address: string;
  
    @Optional()
    filename: string;
  
   

}

export class loginDTO {

    @IsNotEmpty({ message: 'enter a valid email address' })
    @IsEmail({}, { message: 'Invalid email format' })
    @Matches(/.*@.*\.com$/, { message: 'Email must contain @, ., com' })
    email: string;
  
    @IsNotEmpty({ message: 'password is required' })
    @IsString({ message: 'password must be a string' })
    @Matches(/.*[0-9].*/, { message: 'Password must contain one of the numeric character' })
    @Matches(/[#@\$&]/, { message: 'Password must contain one of the special characters (@ or # or $ or &)' })
    @Matches(/^.{8,}$/, { message: 'Password must be at least 8 characters long' })
    password: string;
}

export class UpdateManagerDTO {


  
  @Optional()
  name: string;


  @Optional()
  email: string;

  @Optional()
  username: string;

  @Optional()
  password: string;

  @Optional()
  address: string;
  
}