import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateStopDTO {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    calle_principal: string;

    @IsString()
    @IsNotEmpty()
    calle_secundaria: string;

    @IsNumber()
    @Min(0)
    tiempo: number;
}