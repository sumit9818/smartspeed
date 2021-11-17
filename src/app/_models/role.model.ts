import { UserPermission } from "./permission.model";
import { Roles } from "./roles";

export interface Role {
    id: string;
    name:Roles,
    permissions:UserPermission,
}
