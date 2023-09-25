import { Injectable } from '@nestjs/common';
import { IBranchRepository } from '../repositories/branch-repository';
import { Either, right } from '@/core/types/either';
import { Branch } from '../entities/branch';
import { BranchAlreadyExistsError } from './errors/branch-already-exists-error';

type CreateBranchUseCaseResponse = Either<
  BranchAlreadyExistsError,
  {
    branch: Branch;
  }
>;

@Injectable()
export class CreateBranchUseCase {
  constructor(private repository: IBranchRepository) {}

  async execute(branch: Branch): Promise<CreateBranchUseCaseResponse> {
    await this.repository.create(branch);

    return right({ branch });
  }
}
