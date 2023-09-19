import { Client as ClientPrisma, Prisma } from '@prisma/client';
import { Client } from '../../domain/entities/client';

export class ClientAdapter {
  static toPrisma(client: Client): Prisma.ClientUncheckedCreateInput {
    return {
      name: client.name,
      email: client.email,
      password: client.password,
      address: client.address,
      cep: client.cep,
      city: client.city,
      cnpjcpf: client.cnpjcpf,
      neighborhood: client.neighborhood,
      numberAddress: client.numberAddress,
      phone: client.phone,
      uf: client.uf,
    };
  }

  static toClient(client: ClientPrisma): Client {
    return Client.create({
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address,
      cep: client.cep,
      city: client.city,
      cnpjcpf: client.cnpjcpf,
      neighborhood: client.neighborhood,
      numberAddress: client.numberAddress,
      password: client.password,
      phone: client.phone,
      obs: client.obs,
      uf: client.uf,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
