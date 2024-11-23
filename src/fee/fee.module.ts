import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeResolver } from './fee.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Fee, FeeSchema } from './fee.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fee.name, schema: FeeSchema }])],
  providers: [FeeService, FeeResolver],
})
export class FeeModule {}
