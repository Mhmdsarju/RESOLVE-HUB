export type OrganizationStatus =
  | "PENDING_PROFILE"
  | "PENDING_VERIFICATION"
  | "ACTIVE"
  | "REJECTED"
  | "SUSPENDED";

export interface Organization {
  id: string;
  name: string;
  industry: string | null;
  companySize: string | null;
  website: string | null;
  description: string | null;
  phone: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  status: OrganizationStatus;
  accessStatus: OrganizationAccessStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrganizationDto {
  name: string;
  industry: string;
  companySize: string;
  website?: string;
  description?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
}

export type OrganizationVerificationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface OrganizationVerification {
  id: string;
  organizationId: string;
  status: OrganizationVerificationStatus;
  rejectionReason: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PendingOrganizationVerification {
  verificationId: string;
  organizationId: string;
  organizationName: string;
  industry: string | null;
  companySize: string | null;
  submittedAt: string | null;
  status: OrganizationVerificationStatus;
}

export interface OrganizationVerificationDetails {
  verification: OrganizationVerification;

  organization: {
    id: string;
    name: string;
    industry: string | null;
    companySize: string | null;
    website: string | null;
    description: string | null;
    phone: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    address: string | null;
    status: string;
  };
}

export type OrganizationAccessStatus =
  | "ACTIVE"
  | "FROZEN";

export interface OrganizationDashboardStats {
  teams: number;
  members: number;
  incidents: number;
  warRooms: number;
  plan: string;
  incidentTrends: {
    month: string;
    incidents: number;
  }[];
  incidentStatus: {
    status: string;
    count: number;
  }[];
  teamIncidents: {
    team: string;
    incidents: number;
  }[];
}

export interface RevenueAnalyticsDTO {
  totalRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  freeSubscriptions: number;
  paidSubscriptions: number;
  planWiseSubscriptions: {
    plan: string;
    count: number;
  }[];
  revenueByPlan: {
    plan: string;
    revenue: number;
  }[];
}

export interface SuperAdminOrganizationsDTO {
  organizations: {
    id: string;
    name: string;
    industry: string | null;
    companySize: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    status: string;
    accessStatus: string;
    createdAt: string;
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaymentHistoryDTO {
  payments: {
    id: string;
    organizationName: string;
    plan: string;
    amount: number;
    currency: string;
    status: string;
    transactionId: string | null;
    razorpayOrderId: string;
    paidAt: string | null;
    createdAt: string;
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SuperAdminDashboardDTO {
    totalOrganizations: number;
    activeOrganizations: number;
    frozenOrganizations: number;

    totalRevenue: number;
    monthlyRevenue: number;
    yearlyRevenue: number;

    freeSubscriptions: number;
    paidSubscriptions: number;

    revenueTrend: {
        month: string;
        revenue: number;
    }[];

    subscriptionDistribution: {
        plan: string;
        count: number;
    }[];

    revenueByPlan: {
        plan: string;
        revenue: number;
    }[];

    recentPayments: {
        organizationName: string;
        plan: string;
        amount: number;
        currency: string;
        status: string;
        paidAt: string | null;
    }[];
}