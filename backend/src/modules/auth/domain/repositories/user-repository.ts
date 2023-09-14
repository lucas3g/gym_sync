import { User } from '../entities/user';

export abstract class IUserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
}
