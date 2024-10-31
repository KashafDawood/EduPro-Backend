import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateClassInput {
  @Field()
  name: string;

  @Field()
  section: string;
}
