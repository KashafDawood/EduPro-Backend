import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateMe(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    if (updateUserInput.password) {
      throw new BadRequestException(
        'This route is not for password updates. Please use /updateMyPassword.',
      );
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserInput, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async DeleteMe(id: string): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { active: false },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }
}
