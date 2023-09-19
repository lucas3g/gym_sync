import { Client } from '../../domain/entities/client';
import { Client as PrismaClient } from '@prisma/client';

export abstract class IClientDatasource {
  abstract create(client: Client): Promise<void>;
  abstract update(client: Client, clientId: number): Promise<PrismaClient>;
  abstract delete(clientId: number): Promise<void>;
  abstract findByCNPJCPF(cnpjcpf: string): Promise<PrismaClient | null>;
  abstract findByEmail(email: string): Promise<PrismaClient | null>;
  abstract findByName(name: string): Promise<PrismaClient[]>;
}
