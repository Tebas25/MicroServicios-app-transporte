import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDTO {
    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsEmail()
    correo: string;

    @IsString()
    @MinLength(10, { message: 'La constraseña debe contener un mínimo de 10 caracteres' })
    password: string
}