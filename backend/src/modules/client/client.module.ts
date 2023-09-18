import { Module } from '@nestjs/common';
import { ClientController } from './presenter/controllers/client.controller';
import { CreateClientUseCase } from './domain/use-cases/create-client';
import { IClientDatasource } from './infra/datasources/client-datasource';
import { ClientDatasource } from './external/datasources/client-datasource';
import { IClientRepository } from './domain/repositories/client-repository';
import { ClientRepository } from './infra/repositories/client-repository';
import { DatabaseModule } from '@/core/database/database.module';
import { CryptographyModule } from '@/core/cryptography/cryptography.module';
import { FetchClientUseCase } from './domain/use-cases/fetch-client-by-name';
import { UpdateClientUseCase } from './domain/use-cases/update-client';
import { DeleteClientUseCase } from './domain/use-cases/delete-client';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [ClientController],
  providers: [
    { provide: IClientDatasource, useClass: ClientDatasource },
    { provide: IClientRepository, useClass: ClientRepository },
    CreateClientUseCase,
    UpdateClientUseCase,
    FetchClientUseCase,
    DeleteClientUseCase,
  ],
})
export class ClientModule {}
