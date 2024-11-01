import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Expense } from './expense.schema';
import { ExpenseService } from './expense.service';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.dto';

@Resolver((of) => Expense)
export class ExpenseResolver {
  constructor(private expenseService: ExpenseService) {}

  @Query((returns) => [Expense])
  findAllExpenses(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Mutation((returns) => Expense)
  createExpense(
    @Args('createExpenseInput') createExpenseInput: CreateExpenseInput,
  ): Promise<Expense> {
    return this.expenseService.create(createExpenseInput);
  }

  @Query(() => Expense)
  async findExpenseById(
    @Args('expenseId') expenseId: string,
  ): Promise<Expense> {
    return this.expenseService.findById(expenseId);
  }

  @Mutation(() => Expense)
  async deleteExpense(@Args('expenseId') expenseId: string): Promise<Expense> {
    return this.expenseService.delete(expenseId);
  }

  @Mutation(() => Expense)
  async updateExpense(
    @Args('expenseId') expenseId: string,
    @Args('updateExpenseInput') updateExpenseInput: UpdateExpenseInput,
  ): Promise<Expense> {
    return this.expenseService.update(expenseId, updateExpenseInput);
  }
}
