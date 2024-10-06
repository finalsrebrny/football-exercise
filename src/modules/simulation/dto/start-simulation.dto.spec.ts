import { validate } from 'class-validator';
import { StartSimulationDto } from './start-simulation.dto';

describe('StartSimulationDto', () => {
  it('should validate name correctly', async () => {
    const dto = new StartSimulationDto();

    dto.name = 'Katar 2023';
    let errors = await validate(dto);
    expect(errors.length).toBe(0); 

    dto.name = 'Short';
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); 

    dto.name = 'This name is way too long and exceeds the maximum length';
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    dto.name = 'Invalid@Name!';
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});