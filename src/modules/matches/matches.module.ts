import { Module } from '@nestjs/common';
import { MatchesService } from './services/matches.service';
import { MatchesResolver } from './resolvers/matches.resolver';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [EventsModule],
  providers: [MatchesService, MatchesResolver],
  exports: [MatchesService],
})
export class MatchesModule {}
