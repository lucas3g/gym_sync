import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { AuthenticateUserUseCase } from '../../domain/use-cases/authenticate-user';
import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import { WrongCredentialsError } from '../../domain/use-cases/errors/wrong-credentials-error';
import { Public } from '@/core/public';

const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthBodySchema = z.infer<typeof authBodySchema>;

@Controller('/sessions')
@Public()
export class AuthController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authBodySchema))
  async handle(@Body() body: AuthBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
