import { PaymentStatus } from "../enums/paymentStatus.enum";

interface PaymentProps {
    id?: string;

    organizationId: string;
    subscriptionId: string;

    amount: number;
    currency?: string;
    status: PaymentStatus;
    transactionId: string;

    paidAt?: Date | null;

    createdAt?: Date;
}

export class Payment {
    public readonly id?: string;

    public organizationId: string;
    public subscriptionId: string;

    public amount: number;
    public currency: string;
    public status: PaymentStatus;
    public transactionId: string;

    public paidAt?: Date | null;

    public readonly createdAt?: Date;

    constructor(props: PaymentProps) {
        this.id = props.id;

        this.organizationId = props.organizationId;
        this.subscriptionId = props.subscriptionId;

        this.amount = props.amount;
        this.currency = props.currency ?? "INR";
        this.status = props.status;
        this.transactionId = props.transactionId;

        this.paidAt = props.paidAt ?? null;

        this.createdAt = props.createdAt;
    }
}