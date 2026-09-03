import { Container } from "inversify";

import { TYPES } from "../types";

import { IPaymentRepository } from "@/modules/payment/domain/interface/IPaymentRepository";
import { ISubscriptionRepository } from "@/modules/subscription/domain/interface/ISubscriptionRepository";

import { CreatePaymentUseCase } from "@/modules/payment/application/usecase/CreatePaymentUseCase";
import { GetPaymentUseCase } from "@/modules/payment/application/usecase/GetPaymentUseCase";
import { GetPaymentsUseCase } from "@/modules/payment/application/usecase/GetPaymentsUseCase";
import { ProcessPaymentUseCase } from "@/modules/payment/application/usecase/ProcessPaymentUseCase";

import { PaymentController } from "@/modules/payment/presentation/controllers/PaymentController";
import { createPaymentRoutes } from "@/modules/payment/presentation/routes/payment.routes";
import { IPlanRepository } from "@/modules/plan/domain/interface/IPlanRepository";
import { RazorpayService } from "@/modules/payment/infrastructure/services/RazorpayService";

export function bindPayment(container: Container) {

    const paymentRepository = container.get<IPaymentRepository>(TYPES.paymentRepository,);
    const subscriptionRepository = container.get<ISubscriptionRepository>(TYPES.subscriptionRepository,);
    const planRepository = container.get<IPlanRepository>(TYPES.planRepository);
    const razorpayService = new RazorpayService();

    const createPaymentUseCase = new CreatePaymentUseCase(
        paymentRepository,
        subscriptionRepository,
        planRepository,
        razorpayService
    );

    const getPaymentUseCase = new GetPaymentUseCase(
        paymentRepository,
    );

    const getPaymentsUseCase = new GetPaymentsUseCase(
        paymentRepository,
    );

    const processPaymentUseCase = new ProcessPaymentUseCase(
        paymentRepository,
        subscriptionRepository,
        planRepository,
        razorpayService
    );

    const paymentController = new PaymentController(
        createPaymentUseCase,
        getPaymentUseCase,
        getPaymentsUseCase,
        processPaymentUseCase,
    );

    const paymentRouter = createPaymentRoutes(paymentController);

    return {
        createPaymentUseCase,
        getPaymentUseCase,
        getPaymentsUseCase,
        processPaymentUseCase,
        paymentController,
        paymentRouter,
    };
}