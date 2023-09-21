import { Either, left, right } from '@/core/types/either';
import { Injectable } from '@nestjs/common';
import { CompanyNotExistsError } from './errors/company-not-exists-error';
import { ICompanyRepository } from '../repositories/company-repository';
import { CompanyHasBranchError } from './errors/company-has-branch-error';

type DeleteCompanyUseCaseResponse = Either<
  CompanyNotExistsError | CompanyHasBranchError,
  void
>;

@Injectable()
export class DeleteCompanyUseCase {
  constructor(private repository: ICompanyRepository) {}
  async execute(companyId: string): Promise<DeleteCompanyUseCaseResponse> {
    const result = await this.repository.delete(companyId);

    if (typeof result !== 'boolean' && result !== null) {
      return right(result);
    }

    if (typeof result === 'boolean') {
      return left(new CompanyHasBranchError());
    }

    return left(new CompanyNotExistsError());
  }
}
