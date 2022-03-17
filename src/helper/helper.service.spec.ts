import { Test, TestingModule } from '@nestjs/testing';
import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelperService],
    }).compile();

    service = module.get<HelperService>(HelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should return a hashpassword that passes bcrypt check', () => {
      expect(service.hashPassword('1234')).toBeDefined();
    });
  });
});
