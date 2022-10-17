import { Roles } from "./roles";
import { Permissions } from "./permission";
import { UserPermission } from "./permission.model";

export class User {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    membership: any;
    transactions: any;
    package_id: any;
    roles:{
        id: string;
        name:Roles,
        permissions:UserPermission,
    };
    contact: string;
    accessToken: string;
}

export interface UserResponse {
    success: boolean,
    data: User
}