import { Test, TestingModule } from '@nestjs/testing';
import { ChildrenService } from './children.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ChildrenService', () => {
  let service: ChildrenService;
  let prisma: PrismaService;

  const mockPrisma = {
    child: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChildrenService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ChildrenService>(ChildrenService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a child with valid data', async () => {
      const userId = 'user-123';
      const childData = {
        name: 'Test Child',
        dateOfBirth: '2023-01-15',
        gender: 'MALE',
      };
      const createdChild = { id: 'child-1', ...childData, userId };

      mockPrisma.child.create.mockResolvedValue(createdChild);

      const result = await service.create(userId, childData);

      expect(result).toEqual(createdChild);
      expect(mockPrisma.child.create).toHaveBeenCalledWith({
        data: {
          ...childData,
          dateOfBirth: expect.any(Date),
          user: { connect: { id: userId } },
        },
      });
    });

    it('should throw BadRequestException when document exceeds 5MB', async () => {
      const userId = 'user-123';
      // Create a base64 string that would exceed 5MB when decoded (~6MB decoded = ~8MB base64)
      const largeDocument = 'A'.repeat(8 * 1024 * 1024);
      const childData = {
        name: 'Test Child',
        dateOfBirth: '2023-01-15',
        medicalDocument: largeDocument,
      };

      await expect(service.create(userId, childData)).rejects.toThrow(BadRequestException);
      expect(mockPrisma.child.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid documentIssueDate', async () => {
      const userId = 'user-123';
      const childData = {
        name: 'Test Child',
        dateOfBirth: '2023-01-15',
        documentIssueDate: 'invalid-date',
      };

      await expect(service.create(userId, childData)).rejects.toThrow(BadRequestException);
      expect(mockPrisma.child.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all children for a user', async () => {
      const userId = 'user-123';
      const children = [
        { id: 'child-1', name: 'Child 1', userId },
        { id: 'child-2', name: 'Child 2', userId },
      ];

      mockPrisma.child.findMany.mockResolvedValue(children);

      const result = await service.findAllByUser(userId);

      expect(result).toEqual(children);
      expect(mockPrisma.child.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array when user has no children', async () => {
      const userId = 'user-no-children';
      mockPrisma.child.findMany.mockResolvedValue([]);

      const result = await service.findAllByUser(userId);

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a child when user has access', async () => {
      const childId = 'child-1';
      const userId = 'user-123';
      const child = { id: childId, name: 'Test Child', userId };

      mockPrisma.child.findFirst.mockResolvedValue(child);

      const result = await service.findOne(childId, userId);

      expect(result).toEqual(child);
      expect(mockPrisma.child.findFirst).toHaveBeenCalledWith({
        where: { id: childId, OR: [{ userId }, { familyMembers: { some: { userId } } }] },
        include: { healthRecords: true, vaccines: true },
      });
    });

    it('should throw NotFoundException when child does not exist', async () => {
      const childId = 'non-existent';
      const userId = 'user-123';

      mockPrisma.child.findFirst.mockResolvedValue(null);

      await expect(service.findOne(childId, userId)).rejects.toThrow(NotFoundException);
    });
  });
});
