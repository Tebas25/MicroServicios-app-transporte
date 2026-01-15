import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { RouteService } from '../services/route.service';
import { CreateRouteDTO } from '../dto/create-route.dto';
import { UpdateRouteDTO } from '../dto/update-route.dto';

@Controller('route')
export class RouteController {
    constructor(private routeService: RouteService) {}

    @Post('create')
    createRoute(@Body() createRouteDTO: CreateRouteDTO) {
        return this.routeService.createRoute(createRouteDTO);
    }

    @Patch('update/:nombre')
    updateRoute(@Param('nombre') nombre: string, @Body() updateRouteDTO: UpdateRouteDTO) {
        return this.routeService.updateRoute(nombre, updateRouteDTO);
    }

    @Get()
    findAllRoutes() {
        return this.routeService.findAllRoutes();
    }

    @Get('user/:id')
    findOneRoute(@Param('id') id: string) {
        return this.routeService.findOneRoute(id);
    }

    @EventPattern('new_incident')
    async handleIncident(
        @Payload() data: any,
        @Ctx() context: RmqContext
    ) {
        await  this.routeService.finddelay(data.ruta_id, data.retrasoEstimado);
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
    }

}