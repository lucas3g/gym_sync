import { Injectable } from '@nestjs/common';
import { ICompanyRepository } from '../repositories/company-repository';
import { Company } from '../entities/company';
import { Either, right } from '@/core/types/either';
import { CompanyAlreadyExistsError } from './errors/company-already-exists-error';

type CreateCompanyUseCaseResponse = Either<
  CompanyAlreadyExistsError,
  {
    company: Company;
  }
>;

@Injectable()
export class CreateCompanyUseCase {
  constructor(private repository: ICompanyRepository) {}

  async execute(company: Company): Promise<CreateCompanyUseCaseResponse> {
    await this.repository.create(company);

    return right({ company });
  }
}
