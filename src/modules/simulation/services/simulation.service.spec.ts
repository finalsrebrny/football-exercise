import { Test, TestingModule } from '@nestjs/testing';
import { SimulationService } from './simulation.service';
import { MatchesService } from '../../matches/services/matches.service';
import { EventsService } from '../../events/services/events.service';
import { of } from 'rxjs';
import { CustomLoggerService } from '../../../core/logger/logger.service';

describe('SimulationService', () => {
  let service: SimulationService;
  let matchesService: MatchesService;
  let eventsService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulationService,
        {
          provide: MatchesService,
          useValue: {
            createMatch: jest.fn(),
            findAll: jest.fn().mockReturnValue([{ id: 1 }, { id: 2 }]),
            resetMatches: jest.fn(),
            hasMatches: jest.fn().mockReturnValue(false),
          },
        },
        {
          provide: EventsService,
          useValue: {
            emitEvent: jest.fn(),
          },
        },
        {
          provide: CustomLoggerService, 
          useValue: {
            log: jest.fn(), 
          },
        },
      ],
    }).compile();

    service = module.get<SimulationService>(SimulationService);
    matchesService = module.get<MatchesService>(MatchesService);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should start simulation', () => {
    const result = service.startSimulation('Katar 2023');
    expect(result).toBe('Simulation started.');
    expect(service.getIsRunning()).toBe(true);
    expect(matchesService.createMatch).toHaveBeenCalledTimes(3);
  });

  it('should stop simulation', () => {
    service.startSimulation('Katar 2023');
    const result = service.stopSimulation();
    expect(result).toBe('Simulation stopped.');
    expect(service.getIsRunning()).toBe(false);
  });

  it('should restart simulation', () => {
    service.startSimulation('Katar 2023');
    service.stopSimulation();
    const result = service.restartSimulation();
    expect(result).toBe('Simulation has been restarted.');
    expect(service.getIsRunning()).toBe(false);
    expect(matchesService.resetMatches).toHaveBeenCalled();
  });

  it('should emit events', (done) => {
    service.startSimulation('Katar 2023');
    setTimeout(() => {
      expect(eventsService.emitEvent).toHaveBeenCalled();
      service.stopSimulation();
      done();
    }, 9500);
  }, 10000);
});
