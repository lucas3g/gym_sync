import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/types/either';
import { IRegisterRepository } from '../repositories/register-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface FindUserByEmailUseCaseRequest {
  email: string;
}

type FindUserByEmailUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: null;
  }
>;

@Injectable()
export class FindUserByEmailUseCaseCase {
  constructor(private registerRepository: IRegisterRepository) {}

  async execute({
    email,
  }: FindUserByEmailUseCaseRequest): Promise<FindUserByEmailUseCaseResponse> {
    const userWithSameEmail = await this.registerRepository.findByEmail(email);

    if (userWithSameEmail != null) {
      return left(new UserAlreadyExistsError(''));
    }

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    return right({ user: userWithSameEmail });
  }
}
