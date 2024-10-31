import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubjectInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  marks?: number;

  @Field({ nullable: true })
  totalMarks?: number;

  @Field({ nullable: true })
  percentage?: number;
}
