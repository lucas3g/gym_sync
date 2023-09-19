import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotAcceptableException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { CreateClientUseCase } from '../../domain/use-cases/create-client';
import { ClientAlreadyExistsError } from '../../domain/use-cases/errors/client-already-exists-error';
import { FetchClientUseCase } from '../../domain/use-cases/fetch-client-by-name';
import { ClientPresenter } from '../adapters/client-presenter';
import { UpdateClientUseCase } from '../../domain/use-cases/update-client';
import { ClientAdapter } from '../../infra/adapters/client-adapter';
import { WrongDataUpdateClientError } from '../../domain/use-cases/errors/wrong-data-update-client-error';
import { DeleteClientUseCase } from '../../domain/use-cases/delete-client';

const createOrUpdateClientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  cnpjcpf: z.string(),
  address: z.string(),
  numberAddress: z.string().default('S/N'),
  neighborhood: z.string().default('Centro'),
  cep: z.string(),
  city: z.string(),
  uf: z.string().default('RS'),
  phone: z.string(),
  obs: z.string().optional().default(''),
  createdAt: z.date().optional().default(new Date()),
});

type CreateOrUpdateClientBodySchema = z.infer<
  typeof createOrUpdateClientBodySchema
>;

@Controller('/clients')
export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private fetchClientUseCase: FetchClientUseCase,
    private updateClientUseCase: UpdateClientUseCase,
    private deleteClientUseCase: DeleteClientUseCase
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createOrUpdateClientBodySchema))
  async create(@Body() body: CreateOrUpdateClientBodySchema) {
    const {
      name,
      email,
      password,
      confirmPassword,
      cnpjcpf,
      address,
      numberAddress,
      neighborhood,
      cep,
      city,
      uf,
      phone,
      obs,
    } = body;

    if (password !== confirmPassword) {
      throw new NotAcceptableException(
        'Password is different from ConfirmPassword.'
      );
    }

    const result = await this.createClientUseCase.execute({
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

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ClientAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }

  @Put('/:id')
  async update(
    @Body() body: CreateOrUpdateClientBodySchema,
    @Param('id') clientId: number
  ) {
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
      createdAt,
    } = body;

    const client = ClientAdapter.toClient({
      id: clientId,
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
      createdAt,
      updatedAt: new Date(),
    });

    const xClientId = Number.parseInt(clientId.toString());

    const result = await this.updateClientUseCase.execute(client, xClientId);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongDataUpdateClientError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') clientId: number) {
    const xClientId = Number.parseInt(clientId.toString());

    const result = await this.deleteClientUseCase.execute(xClientId);

    if (result.isLeft()) {
      const error = result.value;

      throw new BadRequestException(error.message);
    }
  }

  @Get('/:name')
  async fetch(@Param('name') name: string) {
    const result = await this.fetchClientUseCase.execute(name);

    if (result.isLeft()) {
      const error = result.value;

      throw new BadRequestException(error.message);
    }

    const clients = result.value.clients;

    return { clients: clients.map(ClientPresenter.toJSON) };
  }
}
