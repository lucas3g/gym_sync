import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { CreateClientUseCase } from '../../domain/use-cases/create-client';
import { ClientAlreadyExistsError } from '../../domain/use-cases/errors/client-already-exists-error';
import { FetchClientUseCase } from '../../domain/use-cases/fetch-client-by-name';
import { FetchClientError } from '../../domain/use-cases/errors/fetch-client-error';
import { ClientPresenter } from '../adapters/client-presenter';
import { UpdateClientUseCase } from '../../domain/use-cases/update-client';
import { ClientAdapter } from '../../infra/adapters/client-adapter';
import { WrongDataUpdateClientError } from '../../domain/use-cases/errors/wrong-data-update-client-error';
import { DeleteClientUseCase } from '../../domain/use-cases/delete-client';

const createOrUpdateClientBodySchema = z.object({
  id: z.number().default(-1),
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
});

type CreateOrUpdateClientBodySchema = z.infer<
  typeof createOrUpdateClientBodySchema
>;

const fetchClientBodySchema = z.object({
  name: z.string(),
});

type FetchClientBodySchema = z.infer<typeof fetchClientBodySchema>;

const deleteClientBodySchema = z.object({
  id: z.number(),
});

type DeleteClientBodySchema = z.infer<typeof deleteClientBodySchema>;

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
    const { password, confirmPassword } = body;

    if (password !== confirmPassword) {
      throw new NotAcceptableException(
        'Password is different from ConfirmPassword.'
      );
    }

    const result = await this.createClientUseCase.execute(body);

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

  @Put()
  @UsePipes(new ZodValidationPipe(createOrUpdateClientBodySchema))
  async update(@Body() body: CreateOrUpdateClientBodySchema) {
    const client = ClientAdapter.toClient(body);

    const result = await this.updateClientUseCase.execute(client);

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

  @Delete()
  @UsePipes(new ZodValidationPipe(deleteClientBodySchema))
  async delete(@Body() body: DeleteClientBodySchema) {
    const { id } = body;
    const result = await this.deleteClientUseCase.execute(id);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongDataUpdateClientError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const deleted = result.value.deleted;

    return { deleted };
  }

  @Get()
  @UsePipes(new ZodValidationPipe(fetchClientBodySchema))
  async fetch(@Body() body: FetchClientBodySchema) {
    const { name } = body;

    const result = await this.fetchClientUseCase.execute(name);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case FetchClientError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const clients = result.value.clients;

    return { clients: clients.map(ClientPresenter.toJSON) };
  }
}
