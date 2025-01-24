import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateClassInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  section?: string;
}
