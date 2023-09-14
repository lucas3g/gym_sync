import { PrismaService } from '@/core/database/prisma/prisma.service';
import { User } from '../../domain/entities/user';
import { IRegisterDatasource } from '../../infra/datasources/register-datasource';
import { UserAdapter } from '../../infra/adapters/user-adapter';
import { User as PrismaUser } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterDatasource implements IRegisterDatasource {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = UserAdapter.toPrisma(user);

    await this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<PrismaUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
