import { Module } from '@nestjs/common';
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
import { EnvModule } from '@/core/env/env.module';
import { EnvService } from '@/core/env/env.service';

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        const privateKey = env.get('JWT_PRIVATE_KEY');
        const publicKey = env.get('JWT_PUBLIC_KEY');

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
    EnvService,
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
