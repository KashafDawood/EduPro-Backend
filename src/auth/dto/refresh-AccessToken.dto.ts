import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RefreshAccessTokenResponse {
  @Field({ nullable: true })
  accessToken: string;
}
