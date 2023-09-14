import { User } from '../entities/user';

export abstract class IUserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
