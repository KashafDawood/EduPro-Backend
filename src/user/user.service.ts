import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UpdateUserInput } from './dto/update-user.input';
import { BaseService } from 'src/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async findAll(): Promise<User[]> {
    return this.findAll();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateMe(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    if (updateUserInput.password) {
      throw new BadRequestException(
        'This route is not for password updates. Please use /updatePassword.',
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
    return this.findById(id);
  }

  async DeleteMe(id: string): Promise<User> {
    return this.delete(id);
  }
}
