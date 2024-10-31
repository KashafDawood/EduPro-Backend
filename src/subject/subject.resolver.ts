import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Subject } from './subject.schema';
import { SubjectService } from './subject.service';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.dto';

@Resolver((of) => Subject)
export class SubjectResolver {
  constructor(private subjectService: SubjectService) {}

  @Query((returns) => [Subject])
  findAllSubject(): Promise<Subject[]> {
    return this.subjectService.findAllSubject();
  }

  @Mutation((returns) => Subject)
  createSubject(
    @Args('createSubjectInput') createSubjectInput: CreateSubjectInput,
  ): Promise<Subject> {
    return this.subjectService.create(createSubjectInput);
  }

  @Query((returns) => Subject)
  findSubjectById(@Args('id') id: string): Promise<Subject> {
    return this.subjectService.findSubjectById(id);
  }

  @Mutation((returns) => Subject)
  deleteSubject(@Args('id') id: string): Promise<Subject> {
    return this.subjectService.deleteSubject(id);
  }

  @Mutation((returns) => Subject)
  updateSubject(
    @Args('id') id: string,
    @Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput,
  ): Promise<Subject> {
    return this.subjectService.updateSubject(id, updateSubjectInput);
  }
}
