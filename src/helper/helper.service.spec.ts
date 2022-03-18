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

  it('should return a hashpassword that passes bcrypt check', () => {
    jest.spyOn(service, 'hashPassword').mockReturnValueOnce('hash123');
    expect(service.hashPassword('1234')).toBe('hash123');
  });

  it('should successfully compare a hasehd password', () => {
    const hashedpassword = service.hashPassword('1234');
    expect(service.comparePassword('1234', hashedpassword)).toBe(true);
    expect(service.comparePassword('12345', hashedpassword)).toBe(false);
  });
});
