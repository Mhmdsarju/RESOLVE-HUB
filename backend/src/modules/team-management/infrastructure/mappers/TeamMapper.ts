import { Team as PrismaTeam } from "@prisma/client";

import { Team } from "../../domain/entities/team.entity";

export class TeamMapper {
  static fromDb(team: PrismaTeam): Team {
  return new Team({
    id: team.id,
    organizationId: team.organizationId,
    createdBy: team.createdBy,
    name: team.name,
    createdAt: team.createdAt,
    updatedAt: team.updatedAt,
    deletedAt: team.deletedAt,
  });
}

  static toDb(team: Team) {
  return {
    organizationId: team.organizationId,
    createdBy: team.createdBy,
    name: team.name,
  };
}
}