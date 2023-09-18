import { Either, right } from '@/core/types/either';
import { Client } from '../entities/client';
import { IClientRepository } from '../repositories/client-repository';
import { Injectable } from '@nestjs/common';
import { ClientAdapter } from '../../infra/adapters/client-adapter';
import { FetchClientError } from './errors/fetch-client-error';

type FetchClientUseCaseResponse = Either<
  FetchClientError,
  {
    clients: Client[];
  }
>;

@Injectable()
export class FetchClientUseCase {
  constructor(private clientRepository: IClientRepository) {}
  async execute(name: string): Promise<FetchClientUseCaseResponse> {
    const clients = await this.clientRepository.findByName(name);

    const result = clients.map(ClientAdapter.toClient);

    return right({ clients: result });
  }
}
