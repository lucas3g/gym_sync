import { User as UserPrisma, Prisma } from '@prisma/client';
import { User } from '../../domain/entities/user';

export class UserAdapter {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  static toDomain(userPrisma: UserPrisma): User {
    return User.create({
      name: userPrisma.name,
      email: userPrisma.email,
      password: userPrisma.password,
    });
  }
}
