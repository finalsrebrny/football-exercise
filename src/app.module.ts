import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MatchesModule } from './modules/matches/matches.module';
import { EventsModule } from './modules/events/events.module';
import { SimulationModule } from './modules/simulation/simulation.module';
import { CustomLoggerService } from './core/logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      }, 
    }),
    MatchesModule,
    EventsModule,
    SimulationModule,
  ],
  providers: [CustomLoggerService]
})
export class AppModule {}