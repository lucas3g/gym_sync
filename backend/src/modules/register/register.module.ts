import { Module } from '@nestjs/common';
import { RegisterController } from './presenter/controllers/register-controller';
import { RegisterUserUseCase } from './domain/use-cases/register-user';
import { DatabaseModule } from '@/core/database/database.module';
import { IRegisterDatasource } from './infra/datasources/register-datasource';
import { RegisterDatasource } from './external/datasources/register-datasource';
import { IRegisterRepository } from './domain/repositories/register-repository';
import { RegisterRepository } from './infra/repositories/register-repository';
import { CryptographyModule } from '@/core/cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [RegisterController],
  providers: [
    { provide: IRegisterDatasource, useClass: RegisterDatasource },
    { provide: IRegisterRepository, useClass: RegisterRepository },
    RegisterUserUseCase,
  ],
})
export class RegisterModule {}
