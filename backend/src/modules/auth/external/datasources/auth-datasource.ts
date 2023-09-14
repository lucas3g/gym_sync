import { PrismaService } from '@/core/database/prisma/prisma.service';
import { IAuthDatasource } from '../../infra/datasources/auth-datasource';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthDatasource implements IAuthDatasource {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
