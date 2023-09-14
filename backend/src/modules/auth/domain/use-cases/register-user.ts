import { Injectable } from '@nestjs/common';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { Either, left, right } from '@/core/types/either';
import { User } from '../entities/user';
import { HashGenerator } from '@/core/cyptography/hash-generator';
import { IUserRepository } from '../repositories/user-repository';

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.create(user);

    return right({ user });
  }
}
