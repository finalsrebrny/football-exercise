import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { MatchesService } from '../../matches/services/matches.service';
import { Event, Team, EventType } from '../entities/event.entity';
import { Subject } from 'rxjs';

describe('EventsService', () => {
  let service: EventsService;
  let matchesService: MatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: MatchesService,
          useValue: {
            scoreGoal: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    matchesService = module.get<MatchesService>(MatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should emit an event', () => {
    const event: Event = {
      id: 'test-id',
      matchId: 'match-1',
      scoringTeam: Team.HOME,
      eventType: EventType.GOAL,
      description: 'Test goal',
      timestamp: new Date(),
    };

    service.emitEvent(event.matchId, event.scoringTeam, event.eventType, event.description);

    service.getEventQueue().subscribe((emittedEvent) => {
      expect(emittedEvent).toEqual(expect.objectContaining({
        matchId: event.matchId,
        scoringTeam: event.scoringTeam,
        eventType: event.eventType,
        description: event.description,
      }));
    });
  });

  it('should call scoreGoal on MatchesService when an event is emitted', () => {
    const event: Event = {
      id: 'test-id',
      matchId: 'match-1',
      scoringTeam: Team.HOME,
      eventType: EventType.GOAL,
      description: 'Test goal',
      timestamp: new Date(),
    };

    service.emitEvent(event.matchId, event.scoringTeam, event.eventType, event.description);

    service.getEventQueue().subscribe(() => {
      expect(matchesService.scoreGoal).toHaveBeenCalledWith(event.matchId, event.scoringTeam);
    });
  });
});
