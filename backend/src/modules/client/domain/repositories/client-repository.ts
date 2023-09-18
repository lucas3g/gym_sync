import { Client } from '../entities/client';

export abstract class IClientRepository {
  abstract create(client: Client): Promise<void>;
  abstract update(client: Client): Promise<Client>;
  abstract findByCNPJCPF(cnpjcpf: string): Promise<Client | null>;
  abstract findByName(name: string): Promise<Client[]>;
}
