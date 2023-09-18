import { UseCaseError } from '@/core/errors/use-case-error';

export class ClientAlreadyExistsError extends Error implements UseCaseError {
  constructor(field: string, identifier: string) {
    super(
      `Client with '${field}' '${identifier}' already exists.`.replaceAll(
        "'",
        ''
      )
    );
  }
}
