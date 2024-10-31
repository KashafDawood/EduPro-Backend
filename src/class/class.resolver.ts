import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Class } from './class.schema';
import { ClassService } from './class.service';
import { CreateClassInput } from './dto/create-class.input';
import { UpdateClassInput } from './dto/update-class.dto';

@Resolver((of) => Class)
export class ClassResolver {
  constructor(private classService: ClassService) {}

  @Mutation((returns) => Class)
  createClass(
    @Args('createClassInput') createClassInput: CreateClassInput,
  ): Promise<Class> {
    return this.classService.create(createClassInput);
  }

  @Query((returns) => [Class])
  findAllClasses(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Query((returns) => Class)
  findClassById(@Args('id') id: string): Promise<Class> {
    return this.classService.findById(id);
  }

  @Mutation((returns) => Class)
  updateClass(
    @Args('id') id: string,
    @Args('updateClassInput') updateClassInput: UpdateClassInput,
  ): Promise<Class> {
    return this.classService.update(id, updateClassInput);
  }

  @Mutation((returns) => Class)
  deleteClass(@Args('id') id: string): Promise<Class> {
    return this.classService.delete(id);
  }
}
