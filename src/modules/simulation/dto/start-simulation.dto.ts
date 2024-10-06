import { IsString, Length, Matches } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Dodaj import Field

@InputType()
export class StartSimulationDto {
  @Field()
  @IsString()
  @Length(8, 30)
  @Matches(/^[a-zA-Z0-9\s]*$/, {
    message: 'It should have minimum 8 characters, maximum 30 characters, only digits, whitespaces or alphabetic characters',
  })
  name: string;
}