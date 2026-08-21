import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { TeamInvitation } from "../../domain/entities/teamInvitation.entity";
import { ITeamInvitationRepository } from "../../domain/interfaces/ITeamInvitationRepository";
import { TeamInvitationMapper } from "../mappers/TeamInvitationMapper";

@injectable()
export class PrismaTeamInvitationRepository implements ITeamInvitationRepository {

    async create(invitation: TeamInvitation): Promise<TeamInvitation> {
        const created = await prisma.teamInvitation.create({
            data: TeamInvitationMapper.toDb(invitation),
        });

        return TeamInvitationMapper.fromDb(created);
    }

    async findById(id: string): Promise<TeamInvitation | null> {
        const invitation = await prisma.teamInvitation.findUnique({
            where: { id },
        });

        if (!invitation) {
            return null;
        }

        return TeamInvitationMapper.fromDb(invitation);
    }

    async findAll(): Promise<TeamInvitation[]> {
        const invitations = await prisma.teamInvitation.findMany({
            where: {
                status: "PENDING",
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return invitations.map(TeamInvitationMapper.fromDb);
    }

    async update(id: string, data: Partial<TeamInvitation>): Promise<TeamInvitation> {
        const updated = await prisma.teamInvitation.update({
            where: { id },
            data: TeamInvitationMapper.toDb({
                ...(data as TeamInvitation),
            }),
        });

        return TeamInvitationMapper.fromDb(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.teamInvitation.delete({
            where: { id },
        });
    }

    async findByToken(token: string): Promise<TeamInvitation | null> {
        const invitation = await prisma.teamInvitation.findUnique({
            where: { token },
        });

        if (!invitation) {
            return null;
        }

        return TeamInvitationMapper.fromDb(invitation);
    }

    async findPendingInvitation(teamId: string, invitedEmail: string): Promise<TeamInvitation | null> {
        const invitation = await prisma.teamInvitation.findFirst({
            where: {
                teamId,
                invitedEmail,
                status: "PENDING",
            },
        });

        if (!invitation) {
            return null;
        }

        return TeamInvitationMapper.fromDb(invitation);
    }

    async findPendingInvitationByEmail(invitedEmail: string,): Promise<TeamInvitation | null> {
        const invitation = await prisma.teamInvitation.findFirst({
            where: {
                invitedEmail,
                status: "PENDING",
            },
        });

        if (!invitation) {
            return null;
        }

        return TeamInvitationMapper.fromDb(invitation);
    }

    async findByTeamId(teamId: string): Promise<TeamInvitation[]> {
        const invitations = await prisma.teamInvitation.findMany({
            where: {
                teamId,
                status: "PENDING",
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return invitations.map(TeamInvitationMapper.fromDb);
    }
}