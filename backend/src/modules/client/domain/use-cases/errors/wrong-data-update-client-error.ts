import { UseCaseError } from '@/core/errors/use-case-error';

export class WrongDataUpdateClientError extends Error implements UseCaseError {
  constructor(field: string) {
    super(`Field ${field} is mandatory.`);
  }
}
