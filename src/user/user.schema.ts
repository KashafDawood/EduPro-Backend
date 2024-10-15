import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail } from 'class-validator';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: [true, 'please tell us your name'] })
  name: string;

  @Field()
  @Prop({
    required: [true, 'please provide your email'],
    unique: true,
    validate: [IsEmail, 'please provide a valid email'],
  })
  email: string;

  @Field()
  @Prop({
    required: [true, 'please provide a password'],
    select: false,
    minlength: [8, 'password must be at least 8 characters'],
  })
  password: string;

  @Field({ nullable: true })
  @Prop()
  phone: string;

  @Field({ nullable: true })
  @Prop()
  address: string;

  @Field()
  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: string;

  @Field()
  @Prop({ default: true })
  active: boolean;

  @Field({ nullable: true })
  @Prop()
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
