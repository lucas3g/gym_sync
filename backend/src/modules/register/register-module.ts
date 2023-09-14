import { Module } from '@nestjs/common';
import { RegisterController } from './presenter/controllers/register-controller';
import { RegisterUserUseCase } from './domain/use-cases/register-user';
import { FindUserByEmailUseCaseCase } from './domain/use-cases/find-user-by-email-usecase';
import { DatabaseModule } from '@/core/database/database.module';
import { IRegisterDatasource } from './infra/datasources/register-datasource';
import { RegisterDatasource } from './external/datasources/register-datasource';
import { IRegisterRepository } from './domain/repositories/register-repository';
import { RegisterRepository } from './infra/repositories/register-repository';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterController],
  providers: [
    { provide: IRegisterDatasource, useClass: RegisterDatasource },
    { provide: IRegisterRepository, useClass: RegisterRepository },
    RegisterUserUseCase,
    FindUserByEmailUseCaseCase,
  ],
})
export class RegisterModule {}
