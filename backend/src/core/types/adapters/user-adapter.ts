import { User as UserPrisma, Prisma } from '@prisma/client';
import { User } from '../../../modules/register/domain/entities/user';

export class UserAdapter {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  static toDomain(userPrisma: UserPrisma): User {
    return User.create({
      id: userPrisma.id,
      name: userPrisma.name,
      email: userPrisma.email,
      password: userPrisma.password,
    });
  }
}
