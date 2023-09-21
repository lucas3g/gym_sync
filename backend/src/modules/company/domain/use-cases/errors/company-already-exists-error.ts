import { UseCaseError } from '@/core/errors/use-case-error';

export class CompanyAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Company with CNPJ '${identifier}' already exists.`);
  }
}
