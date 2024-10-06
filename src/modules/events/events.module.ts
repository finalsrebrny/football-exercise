import { forwardRef, Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { MatchesModule } from '../matches/matches.module'; // Importuj moduł, który zawiera MatchesService

@Module({
  imports: [forwardRef(() => MatchesModule)],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
