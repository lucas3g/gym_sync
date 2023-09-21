import { Entity } from '@/core/entities/entity';

interface CompanyProps {
  id?: string;
  name: string;
  cnpj: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Company extends Entity<CompanyProps> {
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: CompanyProps) {
    const company = new Company(props);

    return company;
  }
}
