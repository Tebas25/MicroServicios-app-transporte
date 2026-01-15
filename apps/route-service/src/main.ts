import { NestFactory } from '@nestjs/core';
import { RouteServiceModule } from './route-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(RouteServiceModule);

  const configService = app.get(ConfigService);
  const rmqUrl = configService.get<string>('RABBITMQ_URL');
  const rmqQueue = configService.get<string>('RABBITMQ_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl as string],
      queue: rmqQueue,
      queueOptions: {
        durable: true,
      },
      noAck: false,
    },
  }),

  await app.startAllMicroservices()
  await app.listen(process.env.port ?? 3001);

  console.log(`🚀 RouteService corriendo en puerto 3001 y escuchando RabbitMQ en la cola: "${rmqQueue}"`);

}
bootstrap();
