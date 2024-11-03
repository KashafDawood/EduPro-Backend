import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput {
  @Field({ nullable: true })
  studentName?: string;

  @Field({ nullable: true })
  studentCNIC?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field(() => ID, { nullable: true })
  Class?: string;

  @Field(() => ID, { nullable: true })
  Subject?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  dateOfAdmission?: Date;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  studentRollNumber?: string;

  @Field({ nullable: true })
  religious?: string;

  @Field({ nullable: true })
  numberOfSiblings?: number;

  @Field({ nullable: true })
  admissionFee?: number;

  @Field({ nullable: true })
  monthlyFee?: number;

  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  guardianName?: string;

  @Field({ nullable: true })
  guardianRelation?: string;

  @Field({ nullable: true })
  guardianPhone?: string;

  @Field({ nullable: true })
  guardianCNIC?: string;

  @Field({ nullable: true })
  guardianProfession?: string;

  @Field({ nullable: true })
  guardianProfessionType?: string;

  @Field({ nullable: true })
  guardianMonthlyIncome?: number;
}
