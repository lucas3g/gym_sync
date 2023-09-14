import { PrismaService } from '@/core/database/prisma/prisma.service';
import { User } from '../../domain/entities/user';
import { IUserDatasource } from '../../infra/datasources/user-datasource';
import { UserAdapter } from '../../infra/adapters/user-adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDatasource implements IUserDatasource {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = UserAdapter.toPrisma(user);

    await this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<Map<string, unknown> | null> {
    throw new Error('Method not implemented.');
  }
}
