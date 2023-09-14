import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  NotAcceptableException,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

const createClientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

type CreateClientBodySchema = z.infer<typeof createClientBodySchema>;

@Controller('/clients')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZodValidationPipe(createClientBodySchema))
export class ClientController {
  @Post()
  async create(@Body() body: CreateClientBodySchema) {
    const { name, email, password, confirmPassword } = body;

    if (password !== confirmPassword) {
      throw new NotAcceptableException(
        'Password is different from ConfirmPassword.'
      );
    }

    return body;
  }
}
