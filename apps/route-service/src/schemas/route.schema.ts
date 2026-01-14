import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BusStop, ParadaSchema } from './bus-stop.schema';

@Schema({ collection: 'rutas', versionKey: false, timestamps: true })
export class Route extends Document {
    @Prop({ required: true })
    nombre: string;

    @Prop({ type: [ParadaSchema], default: [] })
    paradas: BusStop[];

    @Prop({ default: 15 })
    frecuencia: number;
}
export const RouteSchema = SchemaFactory.createForClass(Route);