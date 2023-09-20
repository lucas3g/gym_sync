import { Module } from '@nestjs/common';
import { AccountReceivableController } from './presenter/controllers/account-receivable.controller';
import { DatabaseModule } from '@/core/database/database.module';
import { CryptographyModule } from '@/core/cryptography/cryptography.module';
import { IAccountReceivableDatasource } from './infra/datasources/account-receivable-datasource';
import { AccountReceivableDatasource } from './external/datasources/account-receivable-datasource';
import { IAccountReceivableRepository } from './domain/repositories/account-receivable-repository';
import { AccountReceivableRepository } from './infra/repositories/account-receivable-repository';
import { CreateAccountReceivableUseCase } from './domain/use-cases/create-account-receivable';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AccountReceivableController],
  providers: [
    {
      provide: IAccountReceivableDatasource,
      useClass: AccountReceivableDatasource,
    },
    {
      provide: IAccountReceivableRepository,
      useClass: AccountReceivableRepository,
    },
    CreateAccountReceivableUseCase,
  ],
})
export class AccountsReceivableModule {}
