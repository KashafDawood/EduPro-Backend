import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Class, ClassSchema } from 'src/class/class.schema';
import { Subject, SubjectSchema } from 'src/subject/subject.schema';

@ObjectType()
@Schema()
export class Employee extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: [true, 'please tell us your name'] })
  name: string;

  // @Field({ nullable: true })
  // @Prop()
  // email: string;

  @Field({ nullable: true })
  @Prop()
  phone: string;

  @Field({ nullable: true })
  @Prop()
  guardianPhone: string;

  @Field()
  @Prop({ default: true })
  active: boolean;

  @Field({ nullable: true })
  @Prop()
  photo: string;

  @Field({ nullable: true })
  @Prop()
  address: string;

  @Field()
  @Prop({ required: [true, 'please tell us your guardian name'] })
  guardianName: string;

  @Field()
  @Prop({ required: [true, 'please tell us your relation with guardian'] })
  guardianRelation: string;

  @Field()
  @Prop({
    required: [true, 'please enter the CNIC number'],
    validate: {
      validator: function (v: string) {
        const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
        return cnicRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid CNIC number!`,
    },
  })
  CNIC: string;

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
  dateOfBirth: Date;

  @Field({ nullable: true })
  @Prop()
  dateOfJoining: Date;

  @Field()
  @Prop({ required: [true, 'please tell us your qualification'] })
  qualification: string;

  @Field({ nullable: true })
  @Prop()
  salary: number;

  @Field()
  @Prop()
  role: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

@ObjectType()
@Schema()
export class Teacher extends Employee {
  @Field(() => [ID])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Subject' })
  Subject: MongooseSchema.Types.ObjectId[];

  @Field(() => [Subject], { nullable: 'itemsAndList' })
  @Prop({ type: [SubjectSchema], default: [] })
  subjectData: Subject[];

  @Field(() => [ID])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Class' })
  Class: MongooseSchema.Types.ObjectId[];

  @Field(() => [Class], { nullable: 'itemsAndList' })
  @Prop({ type: [ClassSchema], default: [] })
  classData: Class[];
}
export const TeacherSchema = SchemaFactory.createForClass(Teacher);
