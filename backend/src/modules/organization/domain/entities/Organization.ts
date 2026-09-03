import { OrganizationStatus } from "../enums/organizationStatus.enum";
import { OrganizationAccessStatus } from "../enums/organizationAccessStatus.enum";

interface OrganizationProps {
  id?: string;
  name: string;
  industry?: string | null;
  companySize?: string | null;
  website?: string | null;
  description?: string | null;
  phone?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  address?: string | null;
  status: OrganizationStatus;
  accessStatus: OrganizationAccessStatus;
  createdAt?: Date;
  updatedAt?: Date;

}

export class Organization {
  public readonly id?: string;
  public name: string;
  public industry?: string | null;
  public companySize?: string | null;
  public status: OrganizationStatus;
  public accessStatus: OrganizationAccessStatus;
  public readonly createdAt?: Date;
  public updatedAt?: Date;
  public website?: string | null;
  public description?: string | null;
  public phone?: string | null;
  public country?: string | null;
  public state?: string | null;
  public city?: string | null;
  public address?: string | null;

  constructor(props: OrganizationProps) {
    this.id = props.id;
    this.name = props.name;
    this.industry = props.industry;
    this.companySize = props.companySize;
    this.website = props.website;
    this.description = props.description;
    this.phone = props.phone;
    this.country = props.country;
    this.state = props.state;
    this.city = props.city;
    this.address = props.address;
    this.status = props.status;
    this.accessStatus = props.accessStatus;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

  }

}