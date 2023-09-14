import { User } from '@prisma/client';

export abstract class IUserDatasource {
  abstract findByEmail(email: string): Promise<User | null>;
}
