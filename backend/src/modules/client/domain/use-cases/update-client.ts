import { Either, right } from '@/core/types/either';
import { Client } from '../entities/client';
import { IClientRepository } from '../repositories/client-repository';
import { Injectable } from '@nestjs/common';
import { WrongDataUpdateClientError } from './errors/wrong-data-update-client-error';

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
    const result = await this.clientRepository.update(client);

    return right({ client: result });
  }
}
