import { Client } from '../../domain/entities/client';
import { Client as PrismaClient } from '@prisma/client';

export abstract class IClientDatasource {
  abstract create(client: Client): Promise<void>;
  abstract update(client: Client): Promise<PrismaClient>;
  abstract delete(id: number): Promise<boolean>;
  abstract findByCNPJCPF(cnpjcpf: string): Promise<PrismaClient | null>;
  abstract findByEmail(email: string): Promise<PrismaClient | null>;
  abstract findByName(name: string): Promise<PrismaClient[]>;
}
