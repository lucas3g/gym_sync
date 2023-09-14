import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/repositories/user-repository';
import { IUserDatasource } from '../datasources/user-datasource';
import { UserAdapter } from '@/core/types/adapters/user-adapter';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private datasource: IUserDatasource) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.datasource.findByEmail(email);

    if (!result) {
      return null;
    }

    const user = UserAdapter.toDomain(result);

    return user;
  }
}
