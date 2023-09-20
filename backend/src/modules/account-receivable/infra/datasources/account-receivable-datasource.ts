import { AccountReceivable } from '../../domain/entities/account-receivable';

export abstract class IAccountReceivableDatasource {
  abstract create(accountReceivable: AccountReceivable): Promise<void>;
}
