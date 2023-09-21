import { Company } from '../../domain/entities/company';
import { Company as PrismaCompany } from '@prisma/client';

export abstract class ICompanyDatasource {
  abstract create(company: Company): Promise<void>;
  abstract update(
    company: Company,
    companyId: string
  ): Promise<PrismaCompany | null>;

  abstract fetch(): Promise<PrismaCompany[]>;
}
