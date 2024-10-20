import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput {
  @Field()
  userPassword: string;

  @Field()
  newPassword: string;
}
