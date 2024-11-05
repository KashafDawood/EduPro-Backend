import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  studentName: string;

  @Field()
  studentCNIC: string;

  @Field()
  gender: string;

  @Field(() => ID)
  Class: string;

  @Field(() => [ID])
  Subject: string[];

  @Field()
  dateOfBirth: Date;

  @Field({ nullable: true })
  dateOfAdmission?: Date;

  @Field()
  address: string;

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

  @Field()
  guardianName: string;

  @Field()
  guardianRelation: string;

  @Field()
  guardianPhone: string;

  @Field()
  guardianCNIC: string;

  @Field({ nullable: true })
  guardianProfession?: string;

  @Field({ nullable: true })
  guardianProfessionType?: string;

  @Field({ nullable: true })
  guardianMonthlyIncome?: number;
}
