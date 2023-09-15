import { Client } from '../entities/client';

export abstract class IClientRepository {
  abstract create(client: Client): Promise<void>;
  abstract findByCNPJCPF(cnpjcpf: string): Promise<Client | null>;
}
