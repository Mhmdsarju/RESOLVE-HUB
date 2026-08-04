import { OrganizationStatus } from "../../../auth/domain/enums/OrganizationStatus";

interface OrganizationProps {
  id?: string;
  name: string;
  industry?: string | null;
  companySize?: string | null;
  status: OrganizationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Organization {
  public readonly id?: string;
  public name: string;
  public industry?: string | null;
  public companySize?: string | null;
  public status: OrganizationStatus;
  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: OrganizationProps) {
    this.id = props.id;
    this.name = props.name;
    this.industry = props.industry;
    this.companySize = props.companySize;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}