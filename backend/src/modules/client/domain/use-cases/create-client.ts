import { Either, right } from '@/core/types/either';
import { Client } from '../entities/client';
import { IClientRepository } from '../repositories/client-repository';
import { Injectable } from '@nestjs/common';
import { WrongDataCreateClientError } from './errors/wrong-data-create-client-error';

interface CreateClientUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type CreateClientUseCaseResponse = Either<
  WrongDataCreateClientError,
  {
    client: Client;
  }
>;

@Injectable()
export class CreateClientUseCase {
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
