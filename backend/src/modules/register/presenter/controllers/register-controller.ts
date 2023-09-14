import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { RegisterUserUseCase } from '../../domain/use-cases/register-user';
import { FindUserByEmailUseCaseCase } from '../../domain/use-cases/find-user-by-email-usecase';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class RegisterController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private findUserByEmailUseCase: FindUserByEmailUseCaseCase
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.findUserByEmailUseCase.execute({
      email,
    });

    if (userWithSameEmail.isLeft()) {
      throw new ConflictException(userWithSameEmail.value.message);
    }

    await this.registerUserUseCase.execute({
      name,
      email,
      password,
    });
  }
}
