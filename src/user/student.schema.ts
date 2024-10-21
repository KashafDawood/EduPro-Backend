import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Student extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: [true, 'please enter the student name'] })
  studentName: string;

  @Field({ nullable: true })
  @Prop()
  studentRollNumber: string;

  @Field()
  @Prop({
    required: [true, 'please enter the student CNIC/B-form number'],
    validate: {
      validator: function (v: string) {
        const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
        return cnicRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid CNIC number!`,
    },
  })
  studentCNIC: string;

  @Field()
  @Prop({
    required: [true, 'please enter the student gender'],
    enum: ['male, female'],
  })
  gender: string;

  @Field()
  @Prop({ required: [true, 'please enter the student class'] })
  class: string;

  @Field()
  @Prop({
    required: [true, 'please enter the student Date of Birth'],
  })
  dateOfBirth: Date;

  @Field()
  @Prop({ default: Date.now })
  dateOfAdmission: Date;

  @Field({ nullable: true })
  @Prop()
  religious: string;

  @Field({ nullable: true })
  @Prop()
  numberOfSiblings: number;

  @Field({ nullable: true })
  @Prop()
  admissionFee: number;

  @Field({ nullable: true })
  @Prop()
  monthlyFee: number;

  @Field()
  @Prop({ required: 'please enter the guardian name' })
  guardianName: string;

  @Field()
  @Prop({ required: 'please enter the guardian relation with student' })
  guardianRelation: string;

  @Field()
  @Prop({ required: [true, 'please enter the guardian phone number'] })
  guardianPhone: string;

  @Field()
  @Prop({
    required: [true, 'please enter the guardian CNIC number'],
    validate: {
      validator: function (v: string) {
        const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
        return cnicRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid CNIC number!`,
    },
  })
  guardianCNIC: string;

  @Field({ nullable: true })
  @Prop()
  guardianProfession: string;

  @Field({ nullable: true })
  @Prop({ enum: ['gov', 'private'] })
  guardianProfessionType: string;

  @Field({ nullable: true })
  @Prop()
  guardianMonthlyIncome: Number;

  @Field()
  @Prop({ required: [true, 'please enter the student address'] })
  address: string;

  @Field()
  @Prop({
    default: 'student',
    enum: ['student', 'admin', 'teacher', 'otherStaff'],
  })
  role: string;

  @Field()
  @Prop({ default: true })
  active: boolean;

  @Field({ nullable: true })
  @Prop()
  photo: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
