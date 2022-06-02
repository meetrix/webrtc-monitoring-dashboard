import { rolePermissions } from '../app/rolePermissions';
import { IPermissions } from '../features/auth/auth.slice';

export const filterRolePermissions = (role: string) => {
  return rolePermissions[role as keyof typeof rolePermissions];
};

export const isPermissionAvailable = (
  permissions: IPermissions,
  feature: string
) => {
  if (!permissions || !feature) return false;

  return permissions[feature as keyof typeof permissions];
};
