import { Either, right } from '@/core/types/either';
import { IClientRepository } from '../repositories/client-repository';
import { Injectable } from '@nestjs/common';
import { WrongDataUpdateClientError } from './errors/wrong-data-update-client-error';

type DeleteClientUseCaseResponse = Either<WrongDataUpdateClientError, void>;

@Injectable()
export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepository) {}
  async execute(clientId: number): Promise<DeleteClientUseCaseResponse> {
    const result = await this.clientRepository.delete(clientId);

    return right(result);
  }
}
