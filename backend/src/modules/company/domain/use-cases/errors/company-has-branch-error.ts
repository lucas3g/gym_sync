import { UseCaseError } from '@/core/errors/use-case-error';

export class CompanyHasBranchError extends Error implements UseCaseError {
  constructor() {
    super(`Company has branch.`);
  }
}
