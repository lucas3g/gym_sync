import { Either, left, right } from '@/core/types/either';
import { Client } from '../entities/client';
import { IClientRepository } from '../repositories/client-repository';
import { Injectable } from '@nestjs/common';
import { WrongDataCreateClientError } from './errors/wrong-data-create-client-error';
import { ClientAlreadyExistsError } from './errors/client-already-exists-error';

interface ClientRequest {
  id?: number;
  name: string;
  email: string;
  password: string;
  cnpjcpf: string;
  address: string;
  numberAddress: string;
  neighborhood: string;
  cep: string;
  city: string;
  uf: string;
  phone: string;
  obs: string | null;
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
  async execute(client: ClientRequest): Promise<CreateClientUseCaseResponse> {
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

    const {
      name,
      email,
      password,
      cnpjcpf,
      address,
      numberAddress,
      neighborhood,
      cep,
      city,
      uf,
      phone,
      obs,
    } = client;

    const result = Client.create({
      name,
      email,
      password,
      cnpjcpf,
      address,
      numberAddress,
      neighborhood,
      cep,
      city,
      uf,
      phone,
      obs,
    });

    await this.clientRepository.create(result);

    return right({ client: result });
  }
}
