import { Either, right } from '@/core/types/either';
import { IClientRepository } from '../repositories/client-repository';
import { Injectable } from '@nestjs/common';
import { WrongDataUpdateClientError } from './errors/wrong-data-update-client-error';

type DeleteClientUseCaseResponse = Either<
  WrongDataUpdateClientError,
  {
    deleted: boolean;
  }
>;

@Injectable()
export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepository) {}
  async execute(id: number): Promise<DeleteClientUseCaseResponse> {
    const result = await this.clientRepository.delete(id);

    return right({ deleted: result });
  }
}
