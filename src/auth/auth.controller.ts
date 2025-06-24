import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto, } from './dto/register.auth.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() LoginAuthDto: LoginAuthDto) {
    return await this.authService.login(LoginAuthDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto) {
    const user = await this.authService.register(registerDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    return req.user;
  }
}
