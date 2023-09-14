import { User } from '../entities/user';

export abstract class IAuthRepository {
  abstract findByEmail(email: string): Promise<User | null>;
}
