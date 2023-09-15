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

  async findByCNPJCPF(cnpjcpf: string): Promise<Client | null> {
    const client = await this.datasource.findByCNPJCPF(cnpjcpf);

    if (!client) {
      return null;
    }

    return ClientAdapter.toDomain(client);
  }
}
