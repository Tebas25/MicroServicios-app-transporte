import { Body, Controller, Post, Get } from '@nestjs/common';
import { ReportService } from '../services/report-service.service';
import { CreateReportDTO } from '../dto/create-report.dto';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Post()
    createReport(@Body() createReportDTO: CreateReportDTO) {
        return this.reportService.createReport(createReportDTO);
    }

    @Get()
    getAllReports() {
        return this.reportService.findAllReport();
    }
}