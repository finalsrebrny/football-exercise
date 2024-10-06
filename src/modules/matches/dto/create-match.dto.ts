import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMatchDto {
  @Field()
  homeTeam: string;

  @Field()
  awayTeam: string;
}