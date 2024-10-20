import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
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

  @Field({ nullable: true })
  @Prop({ default: null })
  refreshToken: string;

  @Field({ nullable: true })
  @Prop()
  passwordChangedAt: Date;

  @Field({ nullable: true })
  @Prop()
  passwordResetExpire: Date;

  @Field({ nullable: true })
  @Prop()
  passwordResetToken: String;

  // Instance methods
  async correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  changedPasswordAfter(JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        (this.passwordChangedAt.getTime() / 1000).toString(),
        10,
      );
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  }

  createPasswordResetToken(): string {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpire = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

UserSchema.pre('find', function (next) {
  this.where({ active: true });
  next();
});

UserSchema.pre('findOne', function (next) {
  this.where({ active: true });
  next();
});
