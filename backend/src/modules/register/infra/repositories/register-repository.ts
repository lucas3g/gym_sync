import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { IRegisterRepository } from '../../domain/repositories/register-repository';
import { UserAdapter } from '../../../../core/types/adapters/user-adapter';
import { IRegisterDatasource } from '../datasources/register-datasource';

@Injectable()
export class RegisterRepository implements IRegisterRepository {
  constructor(private datasource: IRegisterDatasource) {}

  async create(user: User): Promise<void> {
    await this.datasource.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.datasource.findByEmail(email);

    if (!result) {
      return null;
    }

    const user = UserAdapter.toDomain(result);

    return user;
  }
}
