import { NextFunction, Request, Response } from "express";

import { ResponseHandler } from "@/shared/response/response-handler";
import { BaseController } from "@/shared/base/controllers/BaseController";

import { ICreatePaymentUseCase } from "../../domain/interface/use-cases/ICreatePaymentUseCase";
import { IGetPaymentUseCase } from "../../domain/interface/use-cases/IGetPaymentUseCase";
import { IGetPaymentsUseCase } from "../../domain/interface/use-cases/IGetPaymentsUseCase";
import { IProcessPaymentUseCase } from "../../domain/interface/use-cases/IProcessPaymentUseCase";

export class PaymentController extends BaseController {

    constructor(
        private readonly createPaymentUseCase: ICreatePaymentUseCase,
        private readonly getPaymentUseCase: IGetPaymentUseCase,
        private readonly getPaymentsUseCase: IGetPaymentsUseCase,
        private readonly processPaymentUseCase: IProcessPaymentUseCase,
    ) {
        super();
    }

    async create(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const payment = await this.createPaymentUseCase.execute(
                user.organizationId!,
                req.body.subscriptionId,
                Number(req.body.amount),
            );

            return ResponseHandler.success(
                res,
                "Payment created successfully",
                payment,
            );
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const payments = await this.getPaymentsUseCase.execute(
                user.organizationId!,
            );

            return ResponseHandler.success(
                res,
                "Payments fetched successfully",
                payments,
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const payment = await this.getPaymentUseCase.execute(
                req.params.id,
                user.organizationId!,
            );

            return ResponseHandler.success(
                res,
                "Payment fetched successfully",
                payment,
            );
        } catch (error) {
            next(error);
        }
    }

    async process(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const payment = await this.processPaymentUseCase.execute(
                req.params.id,
                user.organizationId!,
            );

            return ResponseHandler.success(
                res,
                "Payment processed successfully",
                payment,
            );
        } catch (error) {
            next(error);
        }
    }
}