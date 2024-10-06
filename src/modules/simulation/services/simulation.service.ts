import { Injectable } from '@nestjs/common';
import { MatchesService } from '../../matches/services/matches.service';
import { EventsService } from '../../events/services/events.service';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventType, Team } from '../../events/entities/event.entity';
import { CustomLoggerService } from '../../../core/logger/logger.service';

@Injectable()
export class SimulationService {
  private simulationSubscription: Subscription;
  private isRunning = false;
  private lastStartTime: number = 0;

  constructor(
    private matchesService: MatchesService,
    private eventsService: EventsService,
    private logger: CustomLoggerService,
  ) {}

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  startSimulation(name: string): string {
    this.logger.log(`Starting simulation: ${name}`);
    const currentTime = Date.now();
    if (this.isRunning) {
      return 'Simulation is already running.';
    }

    if (currentTime - this.lastStartTime < 5000) {
      return 'Simulation can be started every 5 seconds.';
    }

    if (this.matchesService.hasMatches()) {
      return 'Cannot start simulation because there are matches. Please restart.';
    }

    this.lastStartTime = currentTime;
    this.isRunning = true;

    this.createSampleMatches(); 
    const matches = this.matchesService.findAll();

    this.simulationSubscription = interval(1000)
      .pipe(take(9))
      .subscribe({
        next: () => {
          const randomMatch =
            matches[Math.floor(Math.random() * matches.length)];
          const homeGoal = Math.random() >= 0.5;
          this.eventsService.emitEvent(randomMatch.id, homeGoal ? Team.HOME : Team.AWAY, EventType.GOAL);
        },
        error: null,
        complete: () => {
          this.stopSimulation();
        }
      });

    return 'Simulation started.';
  }

  stopSimulation(): string {
    if (this.simulationSubscription) {
      this.simulationSubscription.unsubscribe();
      this.isRunning = false;
      this.logger.log('Simulation stopped.');
      return 'Simulation stopped.';
    }
    return 'Simulation is not running.';
  }

  restartSimulation(): string {
    this.matchesService.resetMatches();
    this.logger.log('Simulation has been restarted.');
    return 'Simulation has been restarted.';
  }

  private createSampleMatches(): void {
    this.matchesService.createMatch("Germany", "Poland");
    this.matchesService.createMatch("Brazil", "Mexico");
    this.matchesService.createMatch("Argentina", "Uruguay");
  }
}
