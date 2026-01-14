import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    // 1. REGISTRO DE USUARIOS
    async register(CreateUserDTO: CreateUserDTO) {
        const { correo, password, ...rest } = CreateUserDTO;
        const alreadyUser = await this.userModel.findOne({ correo });
        if (alreadyUser) {
            throw new BadRequestException('El correo ya esta registrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({
            ...rest,
            correo,
            password: hashedPassword,
        })
        const ObjectUser = newUser.toObject();
        const { password: _, ... responserUser } = ObjectUser;
        return responserUser;
    }

    // 2. LOGIN del usuario
    async validateUser(LoginUserDTO: LoginUserDTO) {
        const { correo, password } = LoginUserDTO;
        const user = await this.userModel.findOne({ correo });
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = { sub: user._id, correo: user.correo, nombre: user.nombre };
        return {
            access_token: await this.jwtService.signAsync(payload),
            usuario: {
                nombre: user.nombre,
                correo: user.correo
            }
        };
    }
}