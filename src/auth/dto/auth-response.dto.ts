import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  refreshToken: string;
}
