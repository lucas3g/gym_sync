import { Company } from '../../domain/entities/company';

export class CompanyPresenter {
  static toJSON(company: Company) {
    return {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
    };
  }
}
