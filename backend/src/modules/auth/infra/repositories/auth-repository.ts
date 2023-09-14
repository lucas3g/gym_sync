import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { IAuthRepository } from '../../domain/repositories/auth-repository';
import { IAuthDatasource } from '../datasources/auth-datasource';
import { UserAdapter } from '@/core/types/adapters/user-adapter';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private datasource: IAuthDatasource) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.datasource.findByEmail(email);

    if (!result) {
      return null;
    }

    const user = UserAdapter.toDomain(result);

    return user;
  }
}
