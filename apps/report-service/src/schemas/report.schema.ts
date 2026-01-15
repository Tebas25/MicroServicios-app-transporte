import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'reportes', versionKey: false, timestamps: true })
export class Report extends Document {
    @Prop({ required: true })
    ruta_id: string;

    @Prop({ required: true })
    motivo: string;

    @Prop({ required: true })
    retrasoEstimado: number;
}

export const ReportSchema = SchemaFactory.createForClass(Report);