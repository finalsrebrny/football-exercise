import { forwardRef, Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { MatchesModule } from '../matches/matches.module';
import { CustomLoggerService } from '../../core/logger/logger.service';

@Module({
  imports: [forwardRef(() => MatchesModule)],
  providers: [EventsService, CustomLoggerService],
  exports: [EventsService],
})
export class EventsModule {}
