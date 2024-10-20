import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ForgetPasswordInput {
  @Field()
  email: string;
}
