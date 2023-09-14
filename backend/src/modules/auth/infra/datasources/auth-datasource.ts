import { User } from '@prisma/client';

export abstract class IAuthDatasource {
  abstract findByEmail(email: string): Promise<User | null>;
}
