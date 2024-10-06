import { Injectable } from '@nestjs/common';
import { Match } from '../entities/match.entity';
import { v4 as uuidv4 } from 'uuid';
import { PubSub } from 'graphql-subscriptions';
import { Team } from '../../events/entities/event.entity';

@Injectable()
export class MatchesService {
  private matches: Match[] = [];
  private pubSub = new PubSub();

  getPubSub(): PubSub {
    return this.pubSub;
  }

  findAll(): Match[] {
    return this.matches;
  }

  getMatchById(matchId: string): Match | undefined {
    return this.matches.find((m) => m.id === matchId);
  }

  createMatch(homeTeam: string, awayTeam: string): Match {
    const match: Match = {
      id: uuidv4(),
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
    };
    this.matches.push(match);
    return match;
  }

  scoreGoal(matchId: string, team: Team): void {
    const match = this.matches.find((m) => m.id === matchId);
    if (match) {
      if (team === Team.HOME) {
        match.homeScore += 1;
      } else {
        match.awayScore += 1;
      }

      this.pubSub.publish('matchUpdated', { matchUpdated: { 
        id: match.id,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
      }});
    } else {
      console.error('Mecz nie znaleziony:', matchId);
    }
  }

  resetMatches(): void {
    this.matches = [];
  }

  hasMatches(): boolean {
    return this.matches.length > 0;
  }
}
