import { Injectable } from '@nestjs/common';
import { ICompanyRepository } from '../repositories/company-repository';
import { Company } from '../entities/company';
import { Either, left, right } from '@/core/types/either';
import { CompanyAlreadyExistsError } from './errors/company-already-exists-error';
import { CompanyNotExistsError } from './errors/company-not-exists-error';

type UpdateCompanyUseCaseResponse = Either<
  CompanyAlreadyExistsError | CompanyNotExistsError,
  {
    company: Company;
  }
>;

@Injectable()
export class UpdateCompanyUseCase {
  constructor(private repository: ICompanyRepository) {}

  async execute(
    company: Company,
    companyId: string
  ): Promise<UpdateCompanyUseCaseResponse> {
    const result = await this.repository.update(company, companyId);

    if (result !== null) {
      return right({ company: result });
    }

    return left(new CompanyNotExistsError());
  }
}
