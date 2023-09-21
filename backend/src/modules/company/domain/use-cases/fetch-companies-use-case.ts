import { Injectable } from '@nestjs/common';
import { ICompanyRepository } from '../repositories/company-repository';
import { Company } from '../entities/company';
import { Either, right } from '@/core/types/either';

type FetchCompaniesUseCaseResponse = Either<
  null,
  {
    companies: Company[];
  }
>;

@Injectable()
export class FetchCompaniesUseCase {
  constructor(private repository: ICompanyRepository) {}

  async execute(): Promise<FetchCompaniesUseCaseResponse> {
    const companies = await this.repository.fecth();

    return right({ companies });
  }
}
