import { Injectable } from '@nestjs/common';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { Either, left, right } from '@/core/types/either';
import { User } from '../entities/user';
import { IHashGenerator } from '@/core/cyptography/hash-generator';
import { IRegisterRepository } from '../repositories/register-repository';
import { FindUserByEmailUseCaseCase } from './find-user-by-email-usecase';

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
    private findUserByEmailUseCase: FindUserByEmailUseCaseCase,
    private hashGenerator: IHashGenerator
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.findUserByEmailUseCase.execute({
      email,
    });

    if (userWithSameEmail.isLeft()) {
      return left(userWithSameEmail.value);
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
