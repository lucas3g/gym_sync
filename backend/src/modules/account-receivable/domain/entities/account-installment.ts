import { Entity } from '@/core/entities/entity';

interface AccountInstallmentProps {
  id?: string;
  installment: number;
  amount: number;
  remains: number;
  dueDate: Date;
  accountReceivableId?: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class AccountInstallment extends Entity<AccountInstallmentProps> {
  get id() {
    return this.props.id;
  }

  get installment() {
    return this.props.installment;
  }

  get amount() {
    return this.props.amount;
  }

  get remains() {
    return this.props.remains;
  }

  get dueDate() {
    return this.props.dueDate;
  }

  get accountReceivableId() {
    return this.props.accountReceivableId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: AccountInstallmentProps) {
    const acountInstallment = new AccountInstallment(props);

    return acountInstallment;
  }
}
