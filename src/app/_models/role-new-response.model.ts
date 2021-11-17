export interface RoleNewServiceResponse {
  message: string;
  data: RoleNew;
}

export interface RoleNew {
  isactive: boolean;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  name: string;
}
