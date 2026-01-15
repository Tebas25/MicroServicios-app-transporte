import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDTO } from '../dto/create-report.dto';
import { Report } from "../schemas/report.schema"

@Injectable()
export class ReportService {
    constructor (
        @Inject('RABBITMQ_SERVICE') private client: ClientProxy,
        @InjectModel(Report.name) private readonly reportModel: Model<Report>,
    ) {}

    async createReport (createReportDTO: CreateReportDTO) {
        const newReport = new this.reportModel(createReportDTO);
        const savedReport = await newReport.save()
        
        this.client.emit('new_incident', savedReport);
        return {
            message: 'Reporte registrado y enviado a proceso',
            report: savedReport,
        };
    }

    async findAllReport() {
        return this.reportModel.find().sort({ createdAt: -1 }).exec();
    }
}