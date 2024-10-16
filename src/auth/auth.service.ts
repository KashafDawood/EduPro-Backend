import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInInput } from './dto/signIn-user.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  async generateRefreshToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(input: SignInInput): Promise<any> {
    const user = this.validateUser(input.email, input.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
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
