import { Either, left, right } from '@/core/types/either';
import { Client } from '../entities/client';
import { IClientRepository } from '../repositories/client-repository';
import { Injectable } from '@nestjs/common';
import { WrongDataUpdateClientError } from './errors/wrong-data-update-client-error';
import { ClientAlreadyExistsError } from './errors/client-already-exists-error';

type UpdateClientUseCaseResponse = Either<
  WrongDataUpdateClientError,
  {
    client: Client;
  }
>;

@Injectable()
export class UpdateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}
  async execute(client: Client): Promise<UpdateClientUseCaseResponse> {
    const clientWithSameCNPJCPF = await this.clientRepository.findByCNPJCPF(
      client.cnpjcpf
    );

    if (clientWithSameCNPJCPF) {
      if (clientWithSameCNPJCPF.id !== client.id) {
        return left(new ClientAlreadyExistsError('CNPJ/CPF', client.cnpjcpf));
      }
    }

    const clientWithSameEmail = await this.clientRepository.findByEmail(
      client.email
    );

    if (clientWithSameEmail) {
      if (clientWithSameEmail.id !== client.id) {
        return left(new ClientAlreadyExistsError('Email', client.email));
      }
    }

    const result = await this.clientRepository.update(client);

    return right({ client: result });
  }
}
