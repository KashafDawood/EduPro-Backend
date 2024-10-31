import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Class extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: [true, 'Please tell us class name'] })
  name: string;

  @Field()
  @Prop({ required: [true, 'Please tell us section name'] })
  section: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);