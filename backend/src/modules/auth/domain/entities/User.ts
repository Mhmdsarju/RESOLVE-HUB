import { UserRole } from "../enums/UserRole";

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  organizationId: string|null;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  public readonly id?: string;
  public name: string;
  public email: string;
  public password: string;
  public organizationId: string|null;
  public role: UserRole;
  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.organizationId = props.organizationId;
    this.role = props.role;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}