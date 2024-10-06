import { MatchesService } from './matches.service';
import { Team } from '../../events/entities/event.entity';

describe('MatchesService', () => {
  let service: MatchesService;

  beforeEach(() => {
    service = new MatchesService();
  });

  it('should create a match', () => {
    const match = service.createMatch('Team A', 'Team B');
    expect(match).toHaveProperty('id');
    expect(match.homeTeam).toBe('Team A');
    expect(match.awayTeam).toBe('Team B');
  });

  it('should find all matches', () => {
    service.createMatch('Team A', 'Team B');
    const matches = service.findAll();
    expect(matches.length).toBe(1);
  });

  it('should score a goal for home team', () => {
    const match = service.createMatch('Team A', 'Team B');
    service.scoreGoal(match.id, Team.HOME);
    expect(service.getMatchById(match.id)?.homeScore).toBe(1);
  });

  it('should score a goal for away team', () => {
    const match = service.createMatch('Team A', 'Team B');
    service.scoreGoal(match.id, Team.AWAY);
    expect(service.getMatchById(match.id)?.awayScore).toBe(1);
  });

  it('should reset matches', () => {
    service.createMatch('Team A', 'Team B');
    service.resetMatches();
    expect(service.findAll().length).toBe(0);
  });
});
