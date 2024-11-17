import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateExpenseInput {
  @Field({ nullable: true })
  month?: number;

  @Field({ nullable: true })
  year?: number;

  @Field({ nullable: true })
  salaries?: number;

  @Field({ nullable: true })
  buildingExpense?: number;

  @Field({ nullable: true })
  bills?: number;

  @Field({ nullable: true })
  miscellaneousExpense?: number;
}
