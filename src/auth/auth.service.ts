import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpInput } from './dto/signUp-user.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { SignInInput } from './dto/signIn-user.input';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordInput } from './dto/update-password.input';
import { ForgetPasswordInput } from './dto/forget-password.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return true;
    } catch (err) {
      return false;
    }
  }

  async generateAccessToken(user: User) {
    const payload = { sub: user._id };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    return accessToken;
  }

  async generateRefreshToken(user: User) {
    const payload = { sub: user._id, email: user.email };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
    });

    this.saveRefreshTokenToDB(user._id, refreshToken);
    return refreshToken;
  }

  async saveRefreshTokenToDB(id: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userModel
      .findByIdAndUpdate(
        id,
        { refreshToken: hashedRefreshToken },
        { new: true },
      )
      .exec();
  }

  async validateRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<boolean | null> {
    if (!user.refreshToken) return null;

    const isValid_RToken = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isValid_RToken) throw new UnauthorizedException('Invalid Token');

    return true;
  }

  async refreshAcessToken(id: string, refreshToken: string): Promise<any> {
    const user = await this.userService.findById(id);
    const isValidToken = await this.validateRefreshToken(user, refreshToken);

    if (!isValidToken) throw new NotFoundException('Token not found');

    const accessToken = await this.generateAccessToken(user);
    return accessToken;
  }

  async signIn(input: SignInInput): Promise<any> {
    const user = await this.userModel
      .findOne({ email: input.email })
      .select('+password')
      .exec();

    if (!user) {
      throw new UnauthorizedException('Incorrect! Email');
    }

    const validPass = await user.correctPassword(input.password, user.password);

    if (validPass) {
      const accessToken = await this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user);
      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Incorrect! Password');
    }
  }

  async signUp(signUpInput: SignUpInput): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: signUpInput.email,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const newUser = new this.userModel({ ...signUpInput, role: 'admin' });
    return newUser.save();
  }

  async updatePassword(req: any, input: UpdatePasswordInput): Promise<User> {
    const userId = req.user._id;
    const user = await this.userModel.findById(userId).select('+password');

    if (!(await user.correctPassword(input.userPassword, user.password))) {
      throw new UnauthorizedException('Your current password is wrong');
    }

    user.password = input.newPassword;
    await user.save();

    return user;
  }

  async forgetPassword(input: ForgetPasswordInput): Promise<User> {
    const user = await this.userService.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('There is no User with this email');
    }

    return user;
  }

  async me(accessToken: string): Promise<User> {
    try {
      const validToken = await this.verifyToken(accessToken);

      if (!validToken) {
        throw new UnauthorizedException('Invalid or expired access token');
      }

      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async logout(accessToken: string): Promise<boolean> {
    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const userId = payload?.sub;
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.findByIdAndUpdate(userId, {
      accessToken: null,
      refreshToken: null,
    });
    return true;
  }
}
