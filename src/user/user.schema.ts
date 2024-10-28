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

  @Field()
  @Prop({ enum: ['teacher', 'admin', 'otherStaff'] })
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
}

export interface User extends Document {
  correctPassword: (
    candidatePassword: string,
    userPassword: string,
  ) => Promise<boolean>;

  changedPasswordAfter: (JWTTimestamp: number) => boolean;
  createPasswordResetToken: () => string;
}

export const UserSchema = SchemaFactory.createForClass(User);

//Instance Methods
UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number,
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

UserSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpire = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

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

@ObjectType()
@Schema()
export class Employee extends User {
  @Field({ nullable: true })
  @Prop({
    unique: true,
    validate: [IsEmail, 'please provide a valid email'],
  })
  email: string;

  @Field({ nullable: true })
  @Prop({
    select: false,
  })
  password: string;

  @Field({ nullable: true })
  @Prop()
  address: string;

  @Field()
  @Prop({ required: [true, 'please tell us your guardian name'] })
  guardianName: string;

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

  @Field()
  @Prop()
  dateOfBirth: Date;

  @Field()
  @Prop()
  dateOfJoining: Date;

  @Field()
  @Prop({ required: [true, 'please tell us your qualification'] })
  qualification: string;

  @Field()
  @Prop()
  salary: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
