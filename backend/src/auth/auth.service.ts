import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }

  // DEV BYPASS: PIN login (1234) maps to the first user in DB
  async devLogin(userId: string, userData: any) {
    // Load existing or create fallback user
    let user = userId ? await this.usersService.findById(userId) : null;
    if (!user) {
      // create fallback dev user
      const existing = await this.usersService.findByEmail('dev@kiddok.local');
      if (existing) {
        user = existing;
      } else {
        try {
          user = await this.usersService.createUser({
            email: 'dev@kiddok.local',
            password: 'devpass123',
            name: userData?.name || 'Dev Parent',
          });
        } catch {
          user = await this.usersService.findByEmail('dev@kiddok.local');
        }
      }
    }
    if (!user) throw new UnauthorizedException('No dev user found');

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }
  
  async register(data: any) {
    return this.usersService.createUser(data);
  }
}