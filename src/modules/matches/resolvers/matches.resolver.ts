import { Resolver, Query, Subscription } from '@nestjs/graphql';
import { MatchesService } from '../services/matches.service';
import { Match } from '../entities/match.entity';
import { PubSub } from 'graphql-subscriptions';

interface MatchUpdatedPayload {
  matchUpdated: Match;
}

@Resolver(() => Match)
export class MatchesResolver {
  private pubSub: PubSub;

  constructor(private matchesService: MatchesService) {
    this.pubSub = this.matchesService.getPubSub();
  }

  @Query(() => [Match])
  matches(): Match[] {
    return this.matchesService.findAll();
  }

  @Subscription(() => Match, {
    resolve: (value: MatchUpdatedPayload) => {
      if (!value || !value.matchUpdated) {
        console.error('No updated match data.');
        return null;
      }
      return value.matchUpdated;
    },
  })
  matchUpdated() {
    return this.pubSub.asyncIterator('matchUpdated');
  }
}
