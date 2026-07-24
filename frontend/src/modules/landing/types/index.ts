import type { LucideIcon } from "lucide-react";

export interface Feature {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  initials: string;
  review: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  duration: string;
  popular: boolean;
  buttonText: string;
  features: string[];
}