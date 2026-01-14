import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStopDTO } from './create-stop.dto';

export class CreateRouteDTO {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateStopDTO)
    paradas: CreateStopDTO[]

    @IsNumber()
    frecuencia?: number;
}