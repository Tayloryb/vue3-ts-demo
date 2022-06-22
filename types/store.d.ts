export interface RoleInfo {
  roleName: string;
  value: string;
}

export interface UserInfo {
  username: string;
  id: string | number;
  avatar: string;
  roles: RoleInfo[]
}