export const ROLES = {
  ADMIN: "admin",
  VIEWER: "viewer",
};

export const PERMISSIONS = {
  EDIT_USER: "edit_user",
  DELETE_USER: "delete_user",
};

export const rolePermissons = {
  [ROLES.ADMIN]: [PERMISSIONS.EDIT_USER, PERMISSIONS.DELETE_USER],
  [ROLES.VIEWER]: [],
};
