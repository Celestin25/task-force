import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from './dto/transactions.dto';
import { TransactionEntity } from './entities/transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/accounts/entities/accounts.entity';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({
    createTransactionDto,
    accountId,
    userId,
  }: {
    createTransactionDto: CreateTransactionDto;
    accountId: string;
    userId: string;
  }) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const account = await this.accountRepository.findOne({
      where: { id: accountId, user: { id: userId } },
    });
    if (!account)
      throw new NotFoundException(`Account with ID ${accountId} not found`);

    const transactionType = createTransactionDto.type;
    if (transactionType === 'expense' && createTransactionDto.amount > 0) {
      if (account.balance < createTransactionDto.amount) {
        throw new BadRequestException(`Insufficient funds`);
      }
      account.balance -= createTransactionDto.amount;
    } else if (
      transactionType === 'income' &&
      createTransactionDto.amount > 0
    ) {
      account.balance += createTransactionDto.amount;
    }
    await this.accountRepository.save(account);
    const newTransaction = this.transactionRepository.create({
      ...createTransactionDto,
      account,
    });
    return this.transactionRepository.save(newTransaction);
  }
}

// findOne(id: string) {}

// update(id: number, updateTransactionDto: UpdateTransactionDto) {}
// findAll(): TransactionEntity[] {}
// findByAccount(accountId: string): TransactionEntity[] {}
// findByDateRange(startDate: Date, endDate: Date): TransactionEntity[] {
//   return this.transactions.filter(
//     (txn) => txn.date >= startDate && txn.date <= endDate,
//   );
// }
// remove(id: number) {
//   const index = this.transactions.findIndex((txn) => txn.id === id);
//   if (index === -1) {
//     throw new NotFoundException(`Transaction with ID ${id} not found`);
//   }
//   this.transactions.splice(index, 1);
//   return { message: `Transaction with ID ${id} deleted` };
// }

// calculateSummary(): { income: number; expenses: number; balance: number } {
//   const income = this.transactions
//     .filter((txn) => txn.type === 'IN')
//     .reduce((sum, txn) => sum + txn.amount, 0);

//   const expenses = this.transactions
//     .filter((txn) => txn.type === 'OUT')
//     .reduce((sum, txn) => sum + txn.amount, 0);

//   return {
//     income,
//     expenses,
//     balance: income - expenses,
//   };
// }
