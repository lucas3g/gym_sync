import { Company } from '../entities/company';

export abstract class ICompanyRepository {
  abstract create(company: Company): Promise<void>;
  abstract update(company: Company, companyId: string): Promise<Company | null>;
  abstract fecth(): Promise<Company[]>;
}
