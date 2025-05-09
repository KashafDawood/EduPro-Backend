import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStaffInput {
  @Field()
  name: string;

  // @Field({ nullable: true })
  // email?: string;

  @Field()
  CNIC: string;

  @Field()
  role: string;

  @Field()
  gender: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  dateOfJoining?: Date;

  @Field()
  address: string;

  @Field({ nullable: true })
  photo?: string;

  @Field()
  phone?: string;

  @Field()
  guardianName: string;

  @Field()
  guardianRelation: string;

  @Field()
  guardianPhone: string;

  @Field()
  guardianCNIC: string;

  @Field({ nullable: true })
  qualification?: string;

  @Field({ nullable: true })
  salary?: number;
}
