import { Branch } from '../entities/branch';

export abstract class IBranchRepository {
  abstract create(branch: Branch): Promise<void>;
}
