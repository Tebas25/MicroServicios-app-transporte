import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth-service.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() createUserDTO: CreateUserDTO) {
        return this.authService.register(createUserDTO);
    }

    @Post('login')
    login(@Body() LoginUserDTO: LoginUserDTO) {
        return this.authService.validateUser(LoginUserDTO);
    }
}