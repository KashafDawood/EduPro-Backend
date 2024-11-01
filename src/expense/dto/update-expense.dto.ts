import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateExpenseInput {
  @Field(() => Int, { nullable: true })
  month?: number;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  salaries?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  fees?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  buildingExpense?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  bills?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  miscellaneousExpense?: number;
}
