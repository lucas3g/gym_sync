import { Client } from '../entities/client';

export abstract class IClientRepository {
  abstract create(client: Client): Promise<void>;
  abstract update(client: Client, clientId: number): Promise<Client>;
  abstract delete(clientId: number): Promise<void>;
  abstract findByCNPJCPF(cnpjcpf: string): Promise<Client | null>;
  abstract findByEmail(email: string): Promise<Client | null>;
  abstract findByName(name: string): Promise<Client[]>;
}
