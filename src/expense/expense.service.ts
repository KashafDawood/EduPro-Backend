import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './expense.schema';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';

@Injectable()
export class ExpenseService extends BaseService<Expense> {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>) {
    super(expenseModel);
  }
}
