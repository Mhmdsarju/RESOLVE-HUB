import { Organization } from "../../../auth/domain/entities/Organization";

export interface IOrganizationRepository {

  findById(id: string): Promise<Organization | null>;

  update(organization: Organization): Promise<Organization>;

}