import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface ClientProps {
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
}

export class Client extends Entity<ClientProps> {
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

  static create(props: ClientProps, id?: UniqueEntityID) {
    const client = new Client(props, id);

    return client;
  }
}
