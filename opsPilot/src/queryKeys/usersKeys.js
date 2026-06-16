export const usersKeys = {
  all: ["users"],

  list: () => [...usersKeys.all, "list"],

  detail: (id) => [...usersKeys.all, "detail", id],
};
