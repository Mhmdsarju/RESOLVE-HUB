import { Organization } from "../entities/Organization";

export interface IGetOrganizationProfileUseCase{
    execute(organizationId:string):Promise<Organization>
}