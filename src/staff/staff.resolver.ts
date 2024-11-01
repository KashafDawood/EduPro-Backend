import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Teacher as Staff } from 'src/teacher/teacher.schema';
import { StaffService } from './staff.service';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.dto';

@Resolver((of) => Staff)
export class StaffResolver {
  constructor(private staffService: StaffService) {}

  @Query((returns) => [Staff])
  findAllStaffs(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  @Mutation((returns) => Staff)
  createStaff(
    @Args('createStaffInput') createStaffInput: CreateStaffInput,
  ): Promise<Staff> {
    return this.staffService.create(createStaffInput);
  }

  @Query(() => Staff)
  async findStaffById(@Args('staffId') staffId: string): Promise<Staff> {
    return this.staffService.findById(staffId);
  }

  @Mutation(() => Staff)
  async deleteStaff(@Args('staffId') staffId: string): Promise<Staff> {
    return this.staffService.inactive(staffId);
  }

  @Mutation(() => Staff)
  async updateStaff(
    @Args('staffId') staffId: string,
    @Args('updateStaffInput') updateStaffInput: UpdateStaffInput,
  ): Promise<Staff> {
    return this.staffService.update(staffId, updateStaffInput);
  }
}
