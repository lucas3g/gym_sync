import { Client } from '../../domain/entities/client';
import { Client as PrismaClient } from '@prisma/client';

export abstract class IClientDatasource {
  abstract create(client: Client): Promise<void>;
  abstract findByCNPJCPF(cnpjcpf: string): Promise<PrismaClient | null>;
}
