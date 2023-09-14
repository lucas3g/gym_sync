import { Env } from '@/core/env/env';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { IAuthDatasource } from './infra/datasources/auth-datasource';
import { AuthDatasource } from './external/datasources/auth-datasource';
import { IAuthRepository } from './domain/repositories/auth-repository';
import { AuthRepository } from './infra/repositories/auth-repository';
import { AuthenticateUserUseCase } from './domain/use-cases/authenticate-user';
import { AuthController } from './presenter/controllers/auth.controller';
import { CryptographyModule } from '@/core/cryptography/cryptography.module';
import { DatabaseModule } from '@/core/database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true });
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true });

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    { provide: IAuthDatasource, useClass: AuthDatasource },
    { provide: IAuthRepository, useClass: AuthRepository },
    AuthenticateUserUseCase,
  ],
})
export class AuthModule {}
