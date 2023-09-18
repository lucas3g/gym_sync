import { UseCaseError } from '@/core/errors/use-case-error';

export class FetchClientError extends Error implements UseCaseError {
  constructor() {
    super('Error when searching for client');
  }
}
