import { Query, Resolver } from '@nestjs/graphql';
import { Student } from 'src/user/student.schema';
import { UserService } from 'src/user/user.service';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private userService: UserService) {}

  //   @Query(returns => [Student])
  //   students():Promise<Student[]>{
  //     return this.userService.findAll()
  //   }
}
