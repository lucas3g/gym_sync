import { Prisma } from '@prisma/client';
import { Client } from '../../domain/entities/client';

export class ClientAdapter {
  static toPrisma(client: Client): Prisma.ClientUncheckedCreateInput {
    return {
      id: Number.parseInt(client.id.toString()),
      name: client.name,
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
