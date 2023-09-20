import { Injectable } from '@nestjs/common';
import { IAccountReceivableRepository } from '../../domain/repositories/account-receivable-repository';
import { AccountReceivable } from '../../domain/entities/account-receivable';
import { IAccountReceivableDatasource } from '../datasources/account-receivable-datasource';

@Injectable()
export class AccountReceivableRepository
  implements IAccountReceivableRepository
{
  constructor(private datasource: IAccountReceivableDatasource) {}

  async create(accountReceivable: AccountReceivable): Promise<void> {
    await this.datasource.create(accountReceivable);
  }
}
