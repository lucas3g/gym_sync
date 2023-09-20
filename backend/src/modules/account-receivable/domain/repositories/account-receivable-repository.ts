import { AccountReceivable } from '../entities/account-receivable';

export abstract class IAccountReceivableRepository {
  abstract create(accountReceivable: AccountReceivable): Promise<void>;
}
