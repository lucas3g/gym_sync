import { Entity } from '@/core/entities/entity';

interface UserProps {
  id?: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  get id() {
    return this.props.id;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: UserProps) {
    const user = new User(props);

    return user;
  }
}
