import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class File extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  asset_folder: string;

  @Field()
  @Prop({ required: true })
  asset_id: string;

  @Field()
  @Prop({ required: true })
  bytes: number;

  @Field()
  @Prop({ required: true })
  created_at: Date;

  @Field()
  @Prop({ required: true })
  display_name: string;

  @Field()
  @Prop({ required: true })
  etag: string;

  @Field()
  @Prop({ required: true })
  format: string;

  @Field()
  @Prop({ required: true })
  height: number;

  @Field()
  @Prop({ required: true })
  original_filename: string;

  @Field()
  @Prop({ required: true })
  placeholder: boolean;

  @Field()
  @Prop({ required: true })
  public_id: string;

  @Field()
  @Prop({ required: true })
  resource_type: string;

  @Field()
  @Prop({ required: true })
  secure_url: string;

  @Field()
  @Prop({ required: true })
  signature: string;

  @Field(() => [String])
  @Prop({ type: [String], default: [] })
  tags: string[];

  @Field()
  @Prop({ required: true })
  type: string;

  @Field()
  @Prop({ required: true })
  url: string;

  @Field()
  @Prop({ required: true })
  version: number;

  @Field()
  @Prop({ required: true })
  version_id: string;

  @Field()
  @Prop({ required: true })
  width: number;
}

export const FileSchema = SchemaFactory.createForClass(File);
