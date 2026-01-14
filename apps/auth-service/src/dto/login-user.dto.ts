import { IsEmail, IsString } from 'class-validator'

export class LoginUserDTO {
    @IsEmail()
    correo: string;

    @IsString()
    password: string;
}