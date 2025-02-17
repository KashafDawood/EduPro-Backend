import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
  @Field()
  asset_folder: string;

  @Field()
  asset_id: string;

  @Field()
  bytes: number;

  @Field()
  created_at: Date;

  @Field()
  display_name: string;

  @Field()
  etag: string;

  @Field()
  format: string;

  @Field()
  height: number;

  @Field()
  original_filename: string;

  @Field()
  placeholder: boolean;

  @Field()
  public_id: string;

  @Field()
  resource_type: string;

  @Field()
  secure_url: string;

  @Field()
  signature: string;

  @Field(() => [String])
  tags: string[];

  @Field()
  type: string;

  @Field()
  url: string;

  @Field()
  version: number;

  @Field()
  version_id: string;

  @Field()
  width: number;
}
