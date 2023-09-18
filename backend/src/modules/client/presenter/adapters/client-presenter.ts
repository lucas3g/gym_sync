import { Client } from '../../domain/entities/client';

export class ClientPresenter {
  static toJSON(client: Client) {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      password: client.password,
      address: client.address,
      cep: client.cep,
      city: client.city,
      cnpjcpf: client.cnpjcpf,
      neighborhood: client.neighborhood,
      numberAdress: client.numberAddress,
      phone: client.phone,
      uf: client.uf,
    };
  }
}
