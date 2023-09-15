import { Injectable } from '@nestjs/common';
import { Client } from '../../domain/entities/client';
import { IClientRepository } from '../../domain/repositories/client-repository';
import { IClientDatasource } from '../datasources/client-datasource';
import { WrongDataCreateClientError } from '../../domain/use-cases/errors/wrong-data-create-client-error';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(private datasource: IClientDatasource) {}
  async create(client: Client): Promise<void> {
    try {
      await this.datasource.create(client);
    } catch (error) {
      if (error instanceof Error) {
        throw new WrongDataCreateClientError(error.message);
      }
    }
  }
}
