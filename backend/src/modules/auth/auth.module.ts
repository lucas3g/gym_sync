import { Env } from '@/core/env';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { IUserDatasource } from './infra/datasources/user-datasource';
import { UserDatasource } from './external/datasources/user-datasource';
import { IUserRepository } from './domain/repositories/user-repository';
import { UserRepository } from './infra/repositories/user-repository';
import { AuthenticateUserUseCase } from './domain/use-cases/authenticate-user';
import { AuthController } from './presenter/controllers/auth.controller';
import { CryptographyModule } from '@/core/cryptography/cryptography.module';
import { DatabaseModule } from '@/core/database/database.module';

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
    { provide: IUserDatasource, useClass: UserDatasource },
    { provide: IUserRepository, useClass: UserRepository },
    AuthenticateUserUseCase,
  ],
})
export class AuthModule {}
