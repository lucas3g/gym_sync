import { Entity } from '@/core/entities/entity';
import { AccountInstallment } from './account-installment';

export interface AccountReceivableProps {
  id?: string;
  clientId: number;
  sdoc: string;
  ndoc: string;
  branchCompanyId: number;
  amount: number;
  installment: number;
  accountInstallment: AccountInstallment[];
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class AccountReceivable extends Entity<AccountReceivableProps> {
  get id() {
    return this.props.id;
  }

  get clientId() {
    return this.props.clientId;
  }

  get sdoc() {
    return this.props.sdoc;
  }

  get ndoc() {
    return this.props.ndoc;
  }

  get branchCompanyId() {
    return this.props.branchCompanyId;
  }

  get amount() {
    return this.props.amount;
  }

  get installment() {
    return this.props.installment;
  }

  get accountInstallment() {
    return this.props.accountInstallment;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: AccountReceivableProps) {
    const accountsReceivable = new AccountReceivable(props);

    return accountsReceivable;
  }
}
