import { IUpdateMeUseCase } from "../../domain/interfaces/use-cases/IUpdateMeUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UpdateMeDto } from "../dto/updateMe.dto";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { ICreateAuditLogUseCase } from "@/modules/audit-log/domain/interface/usecase/ICreateAuditLogUseCase";
import { AuditAction, AuditEntityType } from "@/modules/audit-log/domain/enums/auditLog.enum";

export class UpdateMeUseCase implements IUpdateMeUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly createAuditLogUseCase: ICreateAuditLogUseCase,
    ) { }

    async execute(dto: UpdateMeDto): Promise<User> {
        if (!dto.userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (dto.name !== undefined) {
            const name = dto.name.trim();

            if (!name) {
                throw new AppError("Name cannot be empty", HttpStatusCode.BAD_REQUEST,);
            }

            if (name.length < 2) {
                throw new AppError("Name must be at least 2 characters", HttpStatusCode.BAD_REQUEST,);
            }

            dto.name = name;
        }

        const existingUser = await this.userRepository.findById(dto.userId);

        if (!existingUser) {
            throw new AppError("User not found", HttpStatusCode.NOT_FOUND,);
        }

        const updatedUser = await this.userRepository.update(
            dto.userId,
            {
                ...(dto.name !== undefined && {
                    name: dto.name,
                }),
                updatedAt: new Date(),
            },
        );

        await this.createAuditLogUseCase.execute({
            organizationId: existingUser.organizationId!,
            action: AuditAction.USER_UPDATED,
            entityType: AuditEntityType.USER,
            entityId: existingUser.id,
            description: `User ${existingUser.name} updated their profile`,
            actorId: existingUser.id,
            metadata: {
                updatedFields: dto.name !== undefined
                    ? ["name"]
                    : [],
            },
        });

        return updatedUser;
    }
}