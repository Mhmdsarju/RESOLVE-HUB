export type PlanName = "FREE" | "PREMIUM";

export interface Plan {

    id: string;

    name: PlanName;

    price: number;

    durationDays: number | null;

    maxProjects: number | null;

    isActive: boolean;

    createdAt: string;

    updatedAt: string;

}

export interface CreatePlanPayload {

    name: PlanName;

    price: number;

    durationDays?: number | null;

    maxProjects?: number | null;

    isActive?: boolean;

}


export interface UpdatePlanPayload {

    name?: PlanName;

    price?: number;

    durationDays?: number | null;

    maxProjects?: number | null;

    isActive?: boolean;

}

export interface UpdatePlanVariables {
  id: string;
  data: UpdatePlanPayload;
}

export interface PlanListProps {
  plans: Plan[];
  isLoading: boolean;
  isError: boolean;
  onEditPlan: (plan: Plan) => void;
}