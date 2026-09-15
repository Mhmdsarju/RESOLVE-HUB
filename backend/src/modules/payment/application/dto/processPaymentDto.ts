export interface ProcessPaymentDto {

    paymentId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;

}