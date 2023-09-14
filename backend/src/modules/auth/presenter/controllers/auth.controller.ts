import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { AuthenticateUserUseCase } from '../../domain/use-cases/authenticate-user';
import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';

const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthBodySchema = z.infer<typeof authBodySchema>;

@Controller('/sessions')
export class AuthController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authBodySchema))
  async handle(@Body() body: AuthBodySchema) {
    const { email, password } = body;

    const accessToken = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    if (accessToken.isLeft()) {
      throw new UnauthorizedException(accessToken.value.message);
    }

    return {
      access_token: accessToken.value.accessToken,
    };
  }
}
