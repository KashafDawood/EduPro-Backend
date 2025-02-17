import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './files.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [FilesService, FilesResolver],
})
export class FilesModule {}
