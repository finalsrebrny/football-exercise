import { Module } from '@nestjs/common';
import { SimulationService } from './services/simulation.service';
import { SimulationResolver } from './resolvers/simulation.resolver';
import { MatchesModule } from '../matches/matches.module';
import { EventsModule } from '../events/events.module';
import { CustomLoggerService } from '../../core/logger/logger.service';

@Module({
  imports: [MatchesModule, EventsModule],
  providers: [SimulationService, SimulationResolver, CustomLoggerService],
})
export class SimulationModule {}
