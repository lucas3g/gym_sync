import { Injectable } from '@nestjs/common';
import { IAccountReceivableDatasource } from '../../infra/datasources/account-receivable-datasource';
import { AccountReceivable } from '../../domain/entities/account-receivable';
import { PrismaService } from '@/core/database/prisma/prisma.service';

@Injectable()
export class AccountReceivableDatasource
  implements IAccountReceivableDatasource
{
  constructor(private prisma: PrismaService) {}
  async create(accountReceivable: AccountReceivable): Promise<void> {
    await this.prisma.accountReceivable.create({
      data: {
        amount: accountReceivable.amount,
        installment: accountReceivable.installment,
        ndoc: accountReceivable.ndoc,
        sdoc: accountReceivable.sdoc,
        accountInstallment: {
          createMany: {
            data: accountReceivable.accountInstallment.map((e) => {
              return {
                amount: e.amount,
                dueDate: e.dueDate,
                installment: e.installment,
                remains: e.remains,
              };
            }),
          },
        },
        branchCompanyId: accountReceivable.branchCompanyId,
        clientId: accountReceivable.clientId,
      },
    });
  }
}
