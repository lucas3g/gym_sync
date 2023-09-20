import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { CreateAccountReceivableUseCase } from '../../domain/use-cases/create-account-receivable';
import { AccountReceivable } from '../../domain/entities/account-receivable';
import { AccountInstallment } from '../../domain/entities/account-installment';

const createInstallmentBodySchema = z.object({
  installment: z.number(),
  amount: z.number(),
  remains: z.number(),
  dueDate: z.coerce.date(),
});

const createAccountBodySchema = z.object({
  clientId: z.number(),
  sdoc: z.string(),
  ndoc: z.string(),
  branchCompanyId: z.number(),
  amount: z.number(),
  installment: z.number(),
  accountInstallment: z.array(createInstallmentBodySchema),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/receivables')
export class AccountReceivableController {
  constructor(
    private createAccountReceivableUseCase: CreateAccountReceivableUseCase
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async create(@Body() body: CreateAccountBodySchema) {
    const account = AccountReceivable.create({
      accountInstallment: body.accountInstallment.map((e) =>
        AccountInstallment.create({
          amount: e.amount,
          dueDate: e.dueDate,
          installment: e.installment,
          remains: e.remains,
        })
      ),
      amount: body.amount,
      branchCompanyId: body.branchCompanyId,
      clientId: body.clientId,
      installment: body.installment,
      ndoc: body.ndoc,
      sdoc: body.sdoc,
    });

    const result = await this.createAccountReceivableUseCase.execute(account);

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
