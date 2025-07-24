import { IsEmail, IsNotEmpty, IsString, IsEnum, IsStrongPassword } from 'class-validator';


export class updateUserDto {

  @IsString()
  name: string;


  @IsEmail()
  email: string;


  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;


  @IsEnum(['LOCADOR', 'INQUILINO'])
  role: 'LOCADOR' | 'INQUILINO';
}
