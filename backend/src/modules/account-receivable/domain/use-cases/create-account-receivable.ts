import { Either, right } from '@/core/types/either';
import { Injectable } from '@nestjs/common';
import { IAccountReceivableRepository } from '../repositories/account-receivable-repository';
import { AccountReceivable } from '../entities/account-receivable';

type CreateAccountReceivableUseCaseResponse = Either<
  null,
  {
    account: AccountReceivable;
  }
>;

@Injectable()
export class CreateAccountReceivableUseCase {
  constructor(private repository: IAccountReceivableRepository) {}

  async execute(
    account: AccountReceivable
  ): Promise<CreateAccountReceivableUseCaseResponse> {
    await this.repository.create(account);

    return right({ account });
  }
}
