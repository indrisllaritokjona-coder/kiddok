import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user without password when credentials are valid', async () => {
      const email = 'parent@kiddok.com';
      const password = 'correct-password';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { id: 'user-1', email, password: hashedPassword, name: 'Test Parent' };

      mockUsersService.findByEmail.mockResolvedValue(user);

      const result = await service.validateUser(email, password);

      expect(result).toEqual({ id: 'user-1', email, name: 'Test Parent' });
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should return null when user is not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('unknown@test.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null when password is incorrect', async () => {
      const user = { id: 'user-1', email: 'parent@kiddok.com', password: 'hashed', name: 'Test Parent' };
      mockUsersService.findByEmail.mockResolvedValue(user);

      const result = await service.validateUser('parent@kiddok.com', 'wrong-password');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user data on successful login', async () => {
      const user = { id: 'user-1', email: 'parent@kiddok.com', name: 'Test Parent' };
      const expectedToken = 'jwt-token-xyz';
      mockJwtService.sign.mockReturnValue(expectedToken);

      const result = await service.login(user);

      expect(result).toEqual({
        access_token: expectedToken,
        user: { id: 'user-1', email: 'parent@kiddok.com', name: 'Test Parent' },
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
    });
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const data = { email: 'new@kiddok.com', password: 'password123', name: 'New Parent' };
      const createdUser = { id: 'user-new', ...data, password: 'hashed' };

      mockUsersService.createUser.mockResolvedValue(createdUser);

      const result = await service.register(data);

      expect(result).toEqual(createdUser);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(data);
    });
  });
});
