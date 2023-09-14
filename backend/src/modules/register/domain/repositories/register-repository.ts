import { User } from '../entities/user';

export abstract class IRegisterRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
