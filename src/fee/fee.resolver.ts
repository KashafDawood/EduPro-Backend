import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Fee } from './fee.schema';
import { FeeService } from './fee.service';
import { CreateFeeInput } from './dto/create-fee.input';
import { UpdateFeeInput } from './dto/update-fee.dto';

@Resolver((of) => Fee)
export class FeeResolver {
  constructor(private feeService: FeeService) {}

  @Query((returns) => [Fee])
  findAllFees(): Promise<Fee[]> {
    return this.feeService.findAll();
  }

  @Mutation((returns) => Fee)
  createFee(
    @Args('createFeeInput') createFeeInput: CreateFeeInput,
  ): Promise<Fee> {
    return this.feeService.create(createFeeInput);
  }

  @Query(() => Fee)
  async findFeeById(@Args('feeId') feeId: string): Promise<Fee> {
    return this.feeService.findById(feeId);
  }

  @Mutation(() => Fee)
  async deleteFee(@Args('feeId') feeId: string): Promise<Fee> {
    return this.feeService.delete(feeId);
  }

  @Mutation(() => Fee)
  async updateFee(
    @Args('feeId') feeId: string,
    @Args('updateFeeInput') updateFeeInput: UpdateFeeInput,
  ): Promise<Fee> {
    return this.feeService.update(feeId, updateFeeInput);
  }
}
