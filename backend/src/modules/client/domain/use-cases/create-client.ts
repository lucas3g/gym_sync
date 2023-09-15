import { Either, right } from '@/core/types/either';
import { Client, ClientProps } from '../entities/client';
import { IClientRepository } from '../repositories/client-repository';
import { Injectable } from '@nestjs/common';
import { WrongDataCreateClientError } from './errors/wrong-data-create-client-error';

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
    const result = Client.create({
      name: client.name,
      email: client.email,
      address: client.address,
      cep: client.cep,
      city: client.city,
      cnpjcpf: client.cnpjcpf,
      neighborhood: client.neighborhood,
      numberAddress: client.numberAddress,
      password: client.password,
      phone: client.phone,
      uf: client.uf,
    });

    await this.clientRepository.create(result);

    return right({ client: result });
  }
}
