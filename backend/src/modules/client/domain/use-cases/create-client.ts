import { Either, right } from '@/core/types/either';
import { Client } from '../entities/client';
import { WrongCredentialsError } from '@/modules/auth/domain/use-cases/errors/wrong-credentials-error';
import { IClientRepository } from '../repositories/client-repository';

interface CreateClientUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type CreateClientUseCaseResponse = Either<
  WrongCredentialsError,
  {
    client: Client;
  }
>;

export abstract class ICreateClientUseCase {
  abstract execute(
    client: CreateClientUseCaseRequest
  ): Promise<CreateClientUseCaseResponse>;
}

export class CreateClientUseCase implements ICreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}
  async execute(
    client: CreateClientUseCaseRequest
  ): Promise<CreateClientUseCaseResponse> {
    const result = Client.create({
      name: client.name,
      email: client.email,
      address: '',
      cep: '',
      city: '',
      cnpjcpf: '',
      neighborhood: '',
      numberAddress: '',
      password: '',
      phone: '',
      uf: '',
    });

    await this.clientRepository.create(result);

    return right({ client: result });
  }
}
