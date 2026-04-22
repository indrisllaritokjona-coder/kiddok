import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    await this.authService.register(body);
    return { message: 'Përdoruesi u regjistrua me sukses' };
  }

  // Rate-limited: 5 login attempts per minute
  @UseGuards(ThrottlerGuard)
  @Throttle({ short: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Kredencialet janë të gabuara');
    }
    return this.authService.login(user);
  }

  // Rate-limited: 5 PIN attempts per minute (strict)
  @UseGuards(ThrottlerGuard)
  @Throttle({ short: { limit: 5, ttl: 60000 } })
  @Post('dev-login')
  async devLogin(@Body() body: any) {
    if (body.pin !== '1234') {
      throw new UnauthorizedException('Invalid PIN');
    }
    const result = await this.authService.devLogin(body.userId, { name: body.name || 'Dev Parent' });
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
