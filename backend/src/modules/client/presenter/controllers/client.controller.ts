import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  NotAcceptableException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { CreateClientUseCase } from '../../domain/use-cases/create-client';
import { ClientAlreadyExistsError } from '../../domain/use-cases/errors/client-already-exists-error';

const createClientBodySchema = z.object({
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

type CreateClientBodySchema = z.infer<typeof createClientBodySchema>;

@Controller('/clients')
@UsePipes(new ZodValidationPipe(createClientBodySchema))
export class ClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}
  @Post()
  async create(@Body() body: CreateClientBodySchema) {
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
}
