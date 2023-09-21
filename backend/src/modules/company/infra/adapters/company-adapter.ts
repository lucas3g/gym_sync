import { Prisma, Company as PrismaCompany } from '@prisma/client';
import { Company } from '../../domain/entities/company';

export class CompanyAdapter {
  static toCompany(company: PrismaCompany) {
    return Company.create({
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
    });
  }

  static toPrisma(company: Company): Prisma.CompanyUncheckedCreateInput {
    return {
      name: company.name,
      cnpj: company.cnpj,
    };
  }
}
