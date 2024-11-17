import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateExpenseInput {
  @Field(() => Int)
  month: number;

  @Field(() => Int)
  year: number;

  @Field(() => Int, { defaultValue: 0 })
  salaries: number;

  @Field(() => Int, { defaultValue: 0 })
  buildingExpense: number;

  @Field(() => Int, { defaultValue: 0 })
  bills: number;

  @Field(() => Int, { defaultValue: 0 })
  miscellaneousExpense: number;
}
