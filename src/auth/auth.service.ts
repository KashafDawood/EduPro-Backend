import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { SignInInput } from './dto/signIn-input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    if (!user) {
      throw new UnauthorizedException('Incorrect! email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect! password');
    }

    const { password: userPassword, ...result } = user.toObject();
    result.id = user.id;
    return result;
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
