import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RouteController } from './controllers/route-controller';
import { RouteService } from './services/route.service';
import { Route, RouteSchema } from './schemas/route.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema}
    ])
  ],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteServiceModule {}
