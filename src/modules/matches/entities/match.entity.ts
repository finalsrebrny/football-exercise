import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Match {
  @Field()
  id: string;

  @Field({ defaultValue: "Unknown Home Team" }) 
  homeTeam: string;

  @Field({ defaultValue: "Unknown Away Team" }) 
  awayTeam: string;

  @Field(() => Int, { defaultValue: 0 })
  homeScore: number; 

  @Field(() => Int, { defaultValue: 0 })
  awayScore: number;
}
