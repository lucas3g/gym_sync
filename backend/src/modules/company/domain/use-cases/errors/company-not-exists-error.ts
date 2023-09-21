import { UseCaseError } from '@/core/errors/use-case-error';

export class CompanyNotExistsError extends Error implements UseCaseError {
  constructor() {
    super(`Company not exists.`);
  }
}
