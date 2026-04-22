import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesService } from './vaccines.service';
import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { NotFoundException } from '@nestjs/common';

describe('VaccinesService', () => {
  let service: VaccinesService;
  let prisma: PrismaService;
  let childrenService: ChildrenService;

  const mockPrisma = {
    vaccine: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockChildrenService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VaccinesService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ChildrenService, useValue: mockChildrenService },
      ],
    }).compile();

    service = module.get<VaccinesService>(VaccinesService);
    prisma = module.get<PrismaService>(PrismaService);
    childrenService = module.get<ChildrenService>(ChildrenService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a vaccine record for a child', async () => {
      const userId = 'user-123';
      const childId = 'child-1';
      const vaccineData = {
        name: 'MMR',
        doseNumber: 1,
        dateGiven: '2024-01-15',
      };
      const createdVaccine = { id: 'vaccine-1', ...vaccineData, childId };

      mockChildrenService.findOne.mockResolvedValue({ id: childId });
      mockPrisma.vaccine.create.mockResolvedValue(createdVaccine);

      const result = await service.create(userId, childId, vaccineData);

      expect(result).toEqual(createdVaccine);
      expect(mockChildrenService.findOne).toHaveBeenCalledWith(childId, userId);
      expect(mockPrisma.vaccine.create).toHaveBeenCalledWith({
        data: {
          ...vaccineData,
          child: { connect: { id: childId } },
        },
      });
    });
  });

  describe('findAllByChild', () => {
    it('should return all vaccines for a child', async () => {
      const userId = 'user-123';
      const childId = 'child-1';
      const vaccines = [
        { id: 'v1', name: 'MMR', childId },
        { id: 'v2', name: 'Hepatitis B', childId },
      ];

      mockChildrenService.findOne.mockResolvedValue({ id: childId });
      mockPrisma.vaccine.findMany.mockResolvedValue(vaccines);

      const result = await service.findAllByChild(userId, childId);

      expect(result).toEqual(vaccines);
      expect(mockChildrenService.findOne).toHaveBeenCalledWith(childId, userId);
      expect(mockPrisma.vaccine.findMany).toHaveBeenCalledWith({
        where: { childId },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a vaccine record when user owns the child', async () => {
      const userId = 'user-123';
      const vaccineId = 'vaccine-1';
      const vaccine = {
        id: vaccineId,
        name: 'MMR',
        child: { userId },
      };

      mockPrisma.vaccine.findUnique.mockResolvedValue(vaccine);

      const result = await service.findOne(userId, vaccineId);

      expect(result).toEqual({ id: vaccineId, name: 'MMR' });
      expect(mockPrisma.vaccine.findUnique).toHaveBeenCalledWith({
        where: { id: vaccineId },
        include: { child: true },
      });
    });

    it('should throw NotFoundException when vaccine does not exist', async () => {
      const userId = 'user-123';
      const vaccineId = 'non-existent';

      mockPrisma.vaccine.findUnique.mockResolvedValue(null);

      await expect(service.findOne(userId, vaccineId)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when user does not own the child', async () => {
      const userId = 'user-other';
      const vaccineId = 'vaccine-1';
      const vaccine = {
        id: vaccineId,
        name: 'MMR',
        child: { userId: 'user-123' },
      };

      mockPrisma.vaccine.findUnique.mockResolvedValue(vaccine);

      await expect(service.findOne(userId, vaccineId)).rejects.toThrow(NotFoundException);
    });
  });
});
