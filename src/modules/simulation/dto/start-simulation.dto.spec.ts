import { validate } from 'class-validator';
import { StartSimulationDto } from './start-simulation.dto';

describe('StartSimulationDto', () => {
  let dto: StartSimulationDto;

  beforeEach(() => {
    dto = new StartSimulationDto();
  });

  it('should pass validation with a valid name', async () => {
    dto.name = 'Katar 2023';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with a short name', async () => {
    dto.name = 'Short';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation with an empty name', async () => {
    dto.name = '';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
  
  it('should fail validation with a null name', async () => {
    dto.name = null;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation with an excessively long name', async () => {
    dto.name = 'This name is way too long and exceeds the maximum length';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation with an invalid name containing special characters', async () => {
    dto.name = 'Invalid@Name!';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});