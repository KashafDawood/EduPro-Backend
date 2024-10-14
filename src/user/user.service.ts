import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { password, ...rest } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
