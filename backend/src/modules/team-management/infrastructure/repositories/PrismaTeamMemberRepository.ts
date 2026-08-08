import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { TeamMember } from "../../domain/entities/teamMember.entity";
import { ITeamMemberRepository, TeamWithRole } from "../../domain/interfaces/ITeamMemberRepository";
import { TeamMemberMapper } from "../mappers/TeamMemberMapper";

@injectable()
export class PrismaTeamMemberRepository implements ITeamMemberRepository {

    async create(teamMember: TeamMember): Promise<TeamMember> {
        const createdMember = await prisma.teamMember.create({
            data: TeamMemberMapper.toDb(teamMember),
        });

        return TeamMemberMapper.fromDb(createdMember);
    }

    async findById(id: string): Promise<TeamMember | null> {
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

    async update(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
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

    async findMember(teamId: string, userId: string): Promise<TeamMember | null> {
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

    async findMembers(teamId: string): Promise<TeamMember[]> {
        const members = await prisma.teamMember.findMany({
            where: {
                teamId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return members.map(TeamMemberMapper.fromDb);
    }

    async findTeamsByUserId(userId: string): Promise<TeamWithRole[]> {
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