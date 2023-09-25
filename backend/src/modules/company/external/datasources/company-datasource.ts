import { Injectable } from '@nestjs/common';
import { ICompanyDatasource } from '../../infra/datasources/company-datasource';
import { Company } from '../../domain/entities/company';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { Company as PrismaCompany } from '@prisma/client';
import { CompanyAdapter } from '../../infra/adapters/company-adapter';

@Injectable()
export class CompanyDatasource implements ICompanyDatasource {
  constructor(private prisma: PrismaService) {}

  async create(company: Company): Promise<void> {
    await this.prisma.company.create({
      data: {
        name: company.name,
        cnpj: company.cnpj,
      },
    });
  }

  async update(
    company: Company,
    companyId: string
  ): Promise<PrismaCompany | null> {
    const exists = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (exists) {
      const result = await this.prisma.company.update({
        where: { id: companyId },
        data: CompanyAdapter.toPrisma(company),
      });

      return result;
    }

    return null;
  }

  async delete(companyId: string): Promise<void | null | boolean> {
    const exists = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (exists) {
      const branch = await this.prisma.branchCompany.findFirst({
        where: {
          companyId,
        },
      });

      if (!branch) {
        await this.prisma.company.delete({
          where: { id: companyId },
        });

        return;
      }

      return true;
    }

    return null;
  }

  async fetch(): Promise<PrismaCompany[]> {
    const companies = await this.prisma.company.findMany();

    return companies;
  }
}
