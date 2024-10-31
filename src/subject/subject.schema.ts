import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Subject extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: [true, 'Please tell us Subject name'] })
  name: string;

  @Field()
  @Prop({
    validate: {
      validator: function (value: number) {
        return value <= this.totalMarks;
      },
      message: 'Marks should not be greater than total marks',
    },
  })
  marks?: number;

  @Field()
  @Prop()
  totalMarks?: number;

  @Field()
  @Prop({
    min: [0, 'Percentage cannot be less than 0'],
    max: [100, 'Percentage cannot be more than 100'],
  })
  percentage?: number;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
