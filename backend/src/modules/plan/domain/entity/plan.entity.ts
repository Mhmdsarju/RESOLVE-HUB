import  { PlanName } from "@/modules/plan/domain/enums/planName.enum"; 

interface PlanProps {
  id?: string;
  name: PlanName;
  price: number;
  durationDays?: number | null;
  maxProjects?: number | null;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Plan {
  public readonly id?: string;
  public name: PlanName;
  public price: number;
  public durationDays?: number | null;
  public maxProjects?: number | null;
  public isActive: boolean;
  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: PlanProps) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.durationDays = props.durationDays ?? null;
    this.maxProjects = props.maxProjects ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}