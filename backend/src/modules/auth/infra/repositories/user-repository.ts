import { User } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/repositories/user-repository';
import { IUserDatasource } from '../datasources/user-datasource';

export class UserRepository implements IUserRepository {
  constructor(private datasource: IUserDatasource) {}

  async create(user: User): Promise<void> {
    try {
      await this.datasource.create(user);
    } catch (error) {
      throw new Error('');
    }
  }

  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
