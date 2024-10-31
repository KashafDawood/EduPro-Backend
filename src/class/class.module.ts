import { Module } from '@nestjs/common';
import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
  ],
  providers: [ClassResolver, ClassService],
})
export class ClassModule {}
