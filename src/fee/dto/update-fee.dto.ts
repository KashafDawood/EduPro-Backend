import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateFeeInput {
  @Field({ nullable: true })
  month?: number;

  @Field({ nullable: true })
  year?: number;

  @Field({ nullable: true })
  amount?: number;
}
