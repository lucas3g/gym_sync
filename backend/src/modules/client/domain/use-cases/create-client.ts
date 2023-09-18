import { Either, left, right } from '@/core/types/either';
import { Client, ClientProps } from '../entities/client';
import { IClientRepository } from '../repositories/client-repository';
import { Injectable } from '@nestjs/common';
import { WrongDataCreateClientError } from './errors/wrong-data-create-client-error';
import { ClientAdapter } from '../../infra/adapters/client-adapter';
import { ClientAlreadyExistsError } from './errors/client-already-exists-error';

type CreateClientUseCaseResponse = Either<
  WrongDataCreateClientError,
  {
    client: Client;
  }
>;

@Injectable()
export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}
  async execute(client: ClientProps): Promise<CreateClientUseCaseResponse> {
    const clientWithSameCNPJCPF = await this.clientRepository.findByCNPJCPF(
      client.cnpjcpf
    );

    if (clientWithSameCNPJCPF) {
      return left(new ClientAlreadyExistsError('CNPJ/CPF', client.cnpjcpf));
    }

    const clientWithSameEmail = await this.clientRepository.findByEmail(
      client.email
    );

    if (clientWithSameEmail) {
      return left(new ClientAlreadyExistsError('Email', client.email));
    }

    const result = ClientAdapter.toClient(client);

    await this.clientRepository.create(result);

    return right({ client: result });
  }
}
