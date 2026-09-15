import { injectable } from "inversify";
import { prisma } from "@/config/database";

import { Team } from "../../domain/entities/team.entity";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { TeamMapper } from "../mappers/TeamMapper";
import { GetTeamsDto } from "../../application/dto/getTeamsDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";


@injectable()
export class PrismaTeamRepository implements ITeamRepository {

    async create(team: Team): Promise<Team> {
        const createdTeam = await prisma.team.create({
            data: TeamMapper.toDb(team)
        })
        return TeamMapper.fromDb(createdTeam);
    }

    async findById(id: string): Promise<Team | null> {
        const team = await prisma.team.findUnique({
            where: { id },
        });

        if (!team) {
            return null;
        }
        return TeamMapper.fromDb(team);
    }

    async findAll(): Promise<Team[]> {
        throw new Error("Method not implemented");
    }

    async update(id: string, data: Partial<Team>): Promise<Team> {

        const updatedTeam = await prisma.team.update({
            where: { id }, data: { name: data.name }
        })
        return TeamMapper.fromDb(updatedTeam);
    }
    async delete(id: string): Promise<void> {
        await prisma.team.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }

    async findByName(organizationId: string, name: string): Promise<Team | null> {
        const team = await prisma.team.findFirst({
            where: {
                organizationId, name, deletedAt: null,
            }
        })

        if (!team) {
            return null
        }
        return TeamMapper.fromDb(team)
    }

    async findTeams(dto: GetTeamsDto): Promise<PaginationResult<Team>> {

        const skip = (dto.page - 1) * dto.limit;

        const where = {
            organizationId: dto.organizationId,
            deletedAt: null,
            ...(dto.search && {
                name: {
                    contains: dto.search,
                    mode: "insensitive" as const,
                },
            }),
        };

        const [teams, total] = await Promise.all([
            prisma.team.findMany({
                where,
                skip,
                take: dto.limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),

            prisma.team.count({
                where,
            }),
        ]);

        return {
            items: teams.map(TeamMapper.fromDb),
            pagination: {
                page: dto.page,
                limit: dto.limit,
                total,
                totalPages: Math.ceil(total / dto.limit),
            },
        };
    }

}