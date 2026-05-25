import { rolePermissons } from "../constants/permissions";

export function usePermissions(role) {
  function hasPermission(permission) {
    return rolePermissons[role]?.includes(permission);
  }

  return { hasPermission };
}
