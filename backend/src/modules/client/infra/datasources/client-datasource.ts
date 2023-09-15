import { Client } from '../../domain/entities/client';

export abstract class IClientDatasource {
  abstract create(client: Client): Promise<void>;
}
