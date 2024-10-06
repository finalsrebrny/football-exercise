import { Field, ObjectType } from '@nestjs/graphql';

export enum Team {
  HOME = 'home',
  AWAY = 'away',
}

export enum EventType {
  GOAL = 'goal',
}

@ObjectType()
export class Event {
  @Field()
  id: string;

  @Field()
  matchId: string;

  @Field(() => Team)
  scoringTeam: Team;

  @Field(() => EventType)
  eventType: EventType;

  @Field()
  description?: string;

  @Field()
  timestamp: Date;

}
