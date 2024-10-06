import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SimulationService } from '../services/simulation.service';
import { StartSimulationDto } from '../dto/start-simulation.dto';

@Resolver()
export class SimulationResolver {
  constructor(private simulationService: SimulationService) {}

  @Mutation(() => String)
  startSimulation(@Args('input') input: StartSimulationDto): string {
    return this.simulationService.startSimulation(input.name);
  }

  @Mutation(() => String)
  stopSimulation(): string {
    return this.simulationService.stopSimulation();
  }

  @Mutation(() => String)
  restartSimulation(): string {
    return this.simulationService.restartSimulation();
  }
}
