import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpInput } from './dto/signUp-user.input';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { SignInInput } from './dto/signIn-user.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(user) {
    const payload = { sub: user.id };
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  async generateRefreshToken(user) {
    const payload = { sub: user.id, email: user.email };
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  async signIn(input: SignInInput): Promise<any> {
    const user = await this.userModel
      .findOne({ email: input.email })
      .select('+password')
      .exec();

    if (!user) {
      throw new UnauthorizedException('Incorrect! email');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect! password');
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async signUp(signUpInput: SignUpInput): Promise<User> {
    const { password, ...rest } = signUpInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
