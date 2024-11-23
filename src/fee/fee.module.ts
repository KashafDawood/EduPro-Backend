import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeResolver } from './fee.resolver';

@Module({
  providers: [FeeService, FeeResolver]
})
export class FeeModule {}
