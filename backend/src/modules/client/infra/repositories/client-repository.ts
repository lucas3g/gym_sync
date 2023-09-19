import { Injectable } from '@nestjs/common';
import { Client } from '../../domain/entities/client';
import { IClientRepository } from '../../domain/repositories/client-repository';
import { IClientDatasource } from '../datasources/client-datasource';
import { ClientAdapter } from '../adapters/client-adapter';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(private datasource: IClientDatasource) {}

  async create(client: Client): Promise<void> {
    await this.datasource.create(client);
  }

  async update(client: Client, clientId: number): Promise<Client> {
    const result = await this.datasource.update(client, clientId);

    return ClientAdapter.toClient(result);
  }

  async delete(clientId: number): Promise<void> {
    await this.datasource.delete(clientId);
  }

  async findByCNPJCPF(cnpjcpf: string): Promise<Client | null> {
    const client = await this.datasource.findByCNPJCPF(cnpjcpf);

    if (!client) {
      return null;
    }

    return ClientAdapter.toClient(client);
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await this.datasource.findByEmail(email);

    if (!client) {
      return null;
    }

    return ClientAdapter.toClient(client);
  }

  async findByName(name: string): Promise<Client[]> {
    const clients = await this.datasource.findByName(name);

    return clients.map(ClientAdapter.toClient);
  }
}
