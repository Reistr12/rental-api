import { IsEmail, IsNotEmpty, IsString, IsEnum, IsStrongPassword } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(['LOCADOR', 'INQUILINO'])
  role: 'LOCADOR' | 'INQUILINO';
}
