import { Injectable } from '@nestjs/common';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { Either, left, right } from '@/core/types/either';
import { User } from '../entities/user';
import { IHashGenerator } from '@/core/cryptography/hash-generator';
import { IRegisterRepository } from '../repositories/register-repository';

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
    private registerRepository: IRegisterRepository,
    private hashGenerator: IHashGenerator
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.registerRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.registerRepository.create(user);

    return right({ user });
  }
}
