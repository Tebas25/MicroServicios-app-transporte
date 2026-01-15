import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route } from '../schemas/route.schema';
import { CreateRouteDTO } from '../dto/create-route.dto';
import { UpdateRouteDTO } from '../dto/update-route.dto';

@Injectable()
export class RouteService {
    constructor(@InjectModel(Route.name) private routeModel: Model<Route>) {}

    async createRoute(createRouteDTO: CreateRouteDTO){
        const newRoute = new this.routeModel(createRouteDTO);
        return await newRoute.save()
    }

    async updateRoute(nombre: string, UpdateRouteDTO: UpdateRouteDTO) {
        const updateRoute = await this.routeModel.findOneAndUpdate(
            { nombre: nombre},
            UpdateRouteDTO,
            { new: true }
        ).exec();
        if(!updateRoute) {
            throw new BadRequestException(`Ruta con el nombre ${nombre} no existe`)
        }
        return updateRoute
    }

    async findAllRoutes() {
        return this.routeModel.find().select('nombre frecuencia').exec();
    }

    async findOneRoute(id: string) {
        const route = await this.routeModel.findById(id).lean().exec();
        if(!route) throw new NotFoundException('Ruta no encontrada');

        const now = new Date();
        const startOperation = new Date(route['updatedAt']);
        const minutesSinceStarted = Math.floor((now.getTime() - startOperation.getTime()) / 60000);
        const frecuency = route.frecuencia || 15;
        const stops = route.paradas.map(parada => {
            const timeToStop = parada.tiempo;
            let delta = minutesSinceStarted - timeToStop;
            if (delta < 0) {
                return { ...parada, tiempo: Math.abs(delta)}
            }
            const timeSinceLastBus = delta % frecuency;
            const timeSinceNextBus = frecuency - timeSinceLastBus;
            const finalTime = timeSinceNextBus === frecuency ? 0 : timeSinceNextBus

            return {
                ...parada,
                tiempo: finalTime
            };
        });

        return {
            ...route,
            paradas: stops,
            _debug_info: {
                minutos_activos: minutesSinceStarted,
                frecuencia_usada: frecuency
            }
        };
    }

    async finddelay(ruta_id: string, minutesDelay: number) {
        const delay = Number(minutesDelay);
        const resultado = await this.routeModel.updateOne(
            { _id: ruta_id },
            { $inc: { "paradas.$[].tiempo": delay } }, 
            { timestamps: false } 
        ).exec();

        if (resultado.matchedCount === 0) {
            throw new BadRequestException("Alerta recibida pero el Id no existe");
        }
    }
}