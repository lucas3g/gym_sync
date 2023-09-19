import { Entity } from '@/core/entities/entity';

export interface AccountsReceivableProps {
  id?: string;
  clientId: number;
  sdoc: string;
  ndoc: string;
  branchCompanyId: number;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class AccountsReceivable extends Entity<AccountsReceivableProps> {
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

  get date() {
    return this.props.date;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: AccountsReceivableProps) {
    const accountsReceivable = new AccountsReceivable(props);

    return accountsReceivable;
  }
}
