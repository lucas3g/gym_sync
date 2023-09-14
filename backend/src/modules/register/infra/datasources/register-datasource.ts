import { User } from '../../domain/entities/user';
import { User as PrismaUser } from '@prisma/client';

export abstract class IRegisterDatasource {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<PrismaUser | null>;
}
