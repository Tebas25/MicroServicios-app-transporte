import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({_id: false })
export class BusStop {
    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    calle_principal: string;

    @Prop({ required: true })
    calle_secundaria: string;

    @Prop({ required: true })
    tiempo: number;
}
export const ParadaSchema = SchemaFactory.createForClass(BusStop);