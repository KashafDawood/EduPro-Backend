import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFeeInput {
  @Field()
  amount: number;

  @Field()
  month: number;

  @Field()
  year: number;
}
