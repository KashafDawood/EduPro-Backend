import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStaffInput {
  @Field({ nullable: true })
  name?: string;

  // @Field({ nullable: true })
  // email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  guardianPhone?: string;

  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  guardianName?: string;

  @Field({ nullable: true })
  guardianRelation?: string;

  @Field({ nullable: true })
  CNIC?: string;

  @Field({ nullable: true })
  guardianCNIC?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  dateOfJoining?: Date;

  @Field({ nullable: true })
  qualification?: string;

  @Field({ nullable: true })
  salary?: number;
}
