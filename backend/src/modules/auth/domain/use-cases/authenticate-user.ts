import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/types/either';
import { IAuthRepository } from '../repositories/auth-repository';
import { IHashCompare } from '@/core/cryptography/hash-compare';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { IEncrypter } from '@/core/cryptography/encrypter';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private hashCompare: IHashCompare,
    private encrypter: IEncrypter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    });

    return right({
      accessToken,
    });
  }
}
