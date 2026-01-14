import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
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
}