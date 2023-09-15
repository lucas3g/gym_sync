import { Injectable } from '@nestjs/common';
import { IClientDatasource } from '../../infra/datasources/client-datasource';
import { Client } from '../../domain/entities/client';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { ClientAdapter } from '../../infra/adapters/client-adapter';
import { Client as PrismaClient } from '@prisma/client';

@Injectable()
export class ClientDatasource implements IClientDatasource {
  constructor(private prisma: PrismaService) {}

  async create(client: Client): Promise<void> {
    const clientPrisma = ClientAdapter.toPrisma(client);

    await this.prisma.client.create({ data: clientPrisma });
  }

  async findByCNPJCPF(cnpjcpf: string): Promise<PrismaClient | null> {
    const result = await this.prisma.client.findUnique({
      where: {
        cnpjcpf,
      },
    });

    return result ?? null;
  }
}
