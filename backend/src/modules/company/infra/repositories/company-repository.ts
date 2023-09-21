import { Injectable } from '@nestjs/common';
import { Company } from '../../domain/entities/company';
import { ICompanyRepository } from '../../domain/repositories/company-repository';
import { ICompanyDatasource } from '../datasources/company-datasource';
import { CompanyAdapter } from '../adapters/company-adapter';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(private datasource: ICompanyDatasource) {}

  async create(company: Company): Promise<void> {
    await this.datasource.create(company);
  }

  async update(company: Company, companyId: string): Promise<Company | null> {
    const result = await this.datasource.update(company, companyId);

    if (result !== null) {
      return CompanyAdapter.toCompany(result);
    }

    return result;
  }

  async fecth(): Promise<Company[]> {
    const result = await this.datasource.fetch();

    const companies = result.map(CompanyAdapter.toCompany);

    return companies;
  }
}
