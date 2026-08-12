import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { PaginationDto } from "@/shared/utils/Pagination/PaginationDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { TeamMember } from "../../domain/entities/teamMember.entity";
import { ITeamMemberRepository, TeamMemberWithUser, TeamWithRole, } from "../../domain/interfaces/ITeamMemberRepository";

import { TeamMemberMapper } from "../mappers/TeamMemberMapper";


@injectable()
export class PrismaTeamMemberRepository
    implements ITeamMemberRepository {
    async create(teamMember: TeamMember,): Promise<TeamMember> {
        const createdMember = await prisma.teamMember.create({
            data: TeamMemberMapper.toDb(teamMember),
        });

        return TeamMemberMapper.fromDb(createdMember);
    }


    async findById(id: string,): Promise<TeamMember | null> {
        const member = await prisma.teamMember.findUnique({
            where: { id },
        });

        if (!member) {
            return null;
        }

        return TeamMemberMapper.fromDb(member);
    }


    async findAll(): Promise<TeamMember[]> {
        throw new Error("Method not implemented.");
    }


    async update(id: string, data: Partial<TeamMember>,): Promise<TeamMember> {
        const updatedMember = await prisma.teamMember.update({
            where: { id },
            data: {
                role: data.role,
            },
        });

        return TeamMemberMapper.fromDb(updatedMember);
    }


    async delete(id: string): Promise<void> {
        await prisma.teamMember.delete({
            where: { id },
        });
    }


    async findMember(teamId: string, userId: string,): Promise<TeamMember | null> {
        const member = await prisma.teamMember.findFirst({
            where: {
                teamId,
                userId,
            },
        });

        if (!member) {
            return null;
        }

        return TeamMemberMapper.fromDb(member);
    }


    async findMembers(teamId: string, pagination: PaginationDto,): Promise<PaginationResult<TeamMemberWithUser>> {
        const { page, limit, search, } = pagination;

        const skip = (page - 1) * limit;


        const where = {
            teamId,

            ...(search
                ? {
                    user: {
                        OR: [
                            {
                                name: {
                                    contains: search,
                                    mode: "insensitive" as const,
                                },
                            },
                            {
                                email: {
                                    contains: search,
                                    mode: "insensitive" as const,
                                },
                            },
                        ],
                    },
                }
                : {}),
        };


        const [members, total] =
            await Promise.all([
                prisma.teamMember.findMany({
                    where,

                    include: {
                        user: {
                            select: {
                                fullName: true,
                                email: true,
                            },
                        },
                    },

                    orderBy: {
                        createdAt: "asc",
                    },

                    skip,
                    take: limit,
                }),

                prisma.teamMember.count({
                    where,
                }),
            ]);


        const items: TeamMemberWithUser[] = members.map((member) => ({
            ...TeamMemberMapper.fromDb(member),
            name: member.user.fullName,
            email: member.user.email,
        }));


        return {
            items,

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(
                    total / limit,
                ),
            },
        };
    }


    async findTeamsByUserId(userId: string,): Promise<TeamWithRole[]> {
        const members = await prisma.teamMember.findMany({
            where: {
                userId,
            },

            include: {
                team: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });


        return members.map((m) => ({
            role: m.role,

            team: {
                id: m.team.id,
                name: m.team.name,
            },
        }));
    }
}