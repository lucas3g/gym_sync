import { Module } from '@nestjs/common';
import { CompanyController } from './presenter/controllers/company.controller';
import { ICompanyDatasource } from './infra/datasources/company-datasource';
import { CompanyDatasource } from './external/datasources/company-datasource';
import { ICompanyRepository } from './domain/repositories/company-repository';
import { CompanyRepository } from './infra/repositories/company-repository';
import { CreateCompanyUseCase } from './domain/use-cases/create-company';
import { DatabaseModule } from '@/core/database/database.module';
import { CryptographyModule } from '@/core/cryptography/cryptography.module';
import { FetchCompaniesUseCase } from './domain/use-cases/fetch-companies-use-case';
import { UpdateCompanyUseCase } from './domain/use-cases/update-company';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CompanyController],
  providers: [
    { provide: ICompanyDatasource, useClass: CompanyDatasource },
    { provide: ICompanyRepository, useClass: CompanyRepository },
    CreateCompanyUseCase,
    UpdateCompanyUseCase,
    FetchCompaniesUseCase,
  ],
})
export class CompanyModule {}
