import { UseCaseError } from '@/core/errors/use-case-error';

export class BranchAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Branch with CNPJ '${identifier}' already exists.`);
  }
}
