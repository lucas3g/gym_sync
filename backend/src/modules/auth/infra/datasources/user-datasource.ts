import { User } from '../../domain/entities/user';

export abstract class IUserDatasource {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<Map<string, unknown> | null>;
}
