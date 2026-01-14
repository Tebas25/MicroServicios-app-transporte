import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './controllers/auth-service.controller';
import { AuthService } from './services/auth-service.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService]
    }),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),

    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configServices: ConfigService) => ({
        secret: configServices.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h'}
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthServiceModule {}
