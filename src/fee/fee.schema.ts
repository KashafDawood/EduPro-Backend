import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Fee extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop({ required: true })
  month: number;

  @Field()
  @Prop({ required: true })
  year: number;
}

export const FeeSchema = SchemaFactory.createForClass(Fee);
