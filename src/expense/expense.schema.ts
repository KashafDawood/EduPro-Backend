import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Expense extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  month: number; // 1-12 for January to December

  @Field()
  @Prop({ required: true })
  year: number; // e.g., 2024

  @Field()
  @Prop({ default: 0 })
  salaries: number;

  @Field()
  @Prop({ default: 0 })
  fees: number;

  @Field()
  @Prop({ default: 0 })
  buildingExpense: number;

  @Field()
  @Prop({ default: 0 })
  bills: number;

  @Field()
  @Prop({ default: 0 })
  miscellaneousExpense: number;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
