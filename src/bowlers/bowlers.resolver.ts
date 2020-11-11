import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
  Int,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { FlowModel, DefectAgeModel } from './bowlers.models';
import { BowlersService } from './bowlers.service';

@Resolver()
export class BowlersResolver {
  constructor(@Inject(BowlersService) private bowlerService: BowlersService) {}

  @Query((returns) => FlowModel)
  async flow(
    @Args('sprint') sprint: string,
    @Args('teamSize', { type: () => Int }) teamSize: number,
  ): Promise<FlowModel> {
    return await this.bowlerService.getFlow(sprint, teamSize);
  }

  @Query((returns) => DefectAgeModel)
  async defectBacklogAge(
    @Args('teams', { type: () => [String] }) teams: [string],
  ): Promise<DefectAgeModel> {
    return await this.bowlerService.getDefectBacklogAge(teams);
  }
}
