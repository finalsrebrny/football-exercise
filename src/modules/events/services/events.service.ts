import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Event, Team, EventType } from '../entities/event.entity';
import { v4 as uuidv4 } from 'uuid';
import { MatchesService } from '../../matches/services/matches.service';
import { CustomLoggerService } from '../../../core/logger/logger.service';

@Injectable()
export class EventsService {
  private eventQueue = new Subject<Event>();

  constructor(
    @Inject(forwardRef(() => MatchesService))
    private readonly matchesService: MatchesService,
    private logger: CustomLoggerService,
  ) {
    this.subscribeToEvents(this.matchesService);
  }

  getEventObservable() {
    return this.eventQueue.asObservable();
  }

  getEventQueue() {
    return this.eventQueue;
  }

  emitEvent(matchId: string, scoringTeam: Team, eventType: EventType, description?: string): void {
    const event: Event = {
      id: uuidv4(),
      matchId,
      scoringTeam,
      eventType,
      description,
      timestamp: new Date(),
    };
    this.eventQueue.next(event);
  }

  private subscribeToEvents(matchesService: MatchesService): void {
    this.getEventObservable().subscribe((event) => {
      try {
        matchesService.scoreGoal(event.matchId, event.scoringTeam);
      } catch (error) {
        this.logger.error('Error processing event:', error);
      }
    });
  }
}
