import { Entity } from '@/core/entities/entity';

interface BranchProps {
  id?: number;
  name: string;
  companyId: string;
}

export class Branch extends Entity<BranchProps> {
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get companyId() {
    return this.props.companyId;
  }

  static create(props: BranchProps) {
    const branch = new Branch(props);

    return branch;
  }
}
