import { ZodValidationPipe } from '@/core/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { CreateCompanyUseCase } from '../../domain/use-cases/create-company';
import { Company } from '../../domain/entities/company';
import { CompanyAlreadyExistsError } from '../../domain/use-cases/errors/company-already-exists-error';
import { FetchCompaniesUseCase } from '../../domain/use-cases/fetch-companies-use-case';
import { CompanyPresenter } from '../adapters/company-presenter';
import { UpdateCompanyUseCase } from '../../domain/use-cases/update-company';
import { CompanyNotExistsError } from '../../domain/use-cases/errors/company-not-exists-error';
import { DeleteCompanyUseCase } from '../../domain/use-cases/delete-company';
import { CompanyHasBranchError } from '../../domain/use-cases/errors/company-has-branch-error';

const createCompanyBodySchema = z.object({
  name: z.string(),
  cnpj: z.string(),
});

type CreateCompanyBodySchema = z.infer<typeof createCompanyBodySchema>;

@Controller('/companies')
export class CompanyController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
    private updateCompanyUseCase: UpdateCompanyUseCase,
    private deleteCompanyUseCase: DeleteCompanyUseCase,
    private fetchCompaniesUseCase: FetchCompaniesUseCase
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCompanyBodySchema))
  async create(@Body() body: CreateCompanyBodySchema) {
    const { name, cnpj } = body;

    const company = Company.create({ name, cnpj });

    const result = await this.createCompanyUseCase.execute(company);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CompanyAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }

  @Put('/:id')
  async update(
    @Param('id') companyId: string,
    @Body() body: CreateCompanyBodySchema
  ) {
    const { name, cnpj } = body;

    const company = Company.create({ name, cnpj });

    const result = await this.updateCompanyUseCase.execute(company, companyId);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CompanyAlreadyExistsError:
          throw new ConflictException(error.message);
        case CompanyNotExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const xCompany = result.value.company;

    return { company: CompanyPresenter.toJSON(xCompany) };
  }

  @Delete('/:id')
  async delete(@Param('id') companyId: string) {
    const result = await this.deleteCompanyUseCase.execute(companyId);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CompanyNotExistsError:
          throw new ConflictException(error.message);
        case CompanyHasBranchError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }

  @Get()
  async fetch() {
    const result = await this.fetchCompaniesUseCase.execute();

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const companies = result.value.companies;

    return { companies: companies.map(CompanyPresenter.toJSON) };
  }
}
