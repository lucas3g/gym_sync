import { Entity } from '@/core/entities/entity';

export interface ClientProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  cnpjcpf: string;
  address: string;
  numberAddress: string;
  neighborhood: string;
  cep: string;
  city: string;
  uf: string;
  phone: string;
  obs?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Client extends Entity<ClientProps> {
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get cnpjcpf() {
    return this.props.cnpjcpf;
  }

  get address() {
    return this.props.address;
  }

  get numberAddress() {
    return this.props.numberAddress;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get cep() {
    return this.props.cep;
  }

  get city() {
    return this.props.city;
  }

  get uf() {
    return this.props.uf;
  }

  get phone() {
    return this.props.phone;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: ClientProps) {
    const client = new Client(props);

    return client;
  }
}
