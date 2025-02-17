import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { File } from './files.schema';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';

@Resolver(() => File)
export class FilesResolver {
  constructor(private filesService: FilesService) {}

  @Query(() => [File])
  findAllFiles(): Promise<File[]> {
    return this.filesService.findAll();
  }

  @Mutation(() => File)
  createFile(
    @Args('createFileInput') createFileInput: CreateFileInput,
  ): Promise<File> {
    return this.filesService.create(createFileInput);
  }

  @Query(() => File)
  async findFileById(@Args('fileId') fileId: string): Promise<File> {
    return this.filesService.findById(fileId);
  }

  @Mutation(() => File)
  async deleteFile(@Args('fileId') fileId: string): Promise<File> {
    return this.filesService.delete(fileId);
  }

  @Mutation(() => File)
  async updateFile(
    @Args('fileId') fileId: string,
    @Args('updateFileInput') updateFileInput: UpdateFileInput,
  ): Promise<File> {
    return this.filesService.update(fileId, updateFileInput);
  }
}
