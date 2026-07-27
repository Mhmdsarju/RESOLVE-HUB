import { IBaseRepository } from "../../../../shared/base/repositories/IBaseRepository";
import { Organization } from "../entities/Organization";

export interface IOrganizationRepository extends IBaseRepository<Organization>{

  findByName(name: string): Promise<Organization | null>;

}