import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/usersApi";
import useToastStore from "../store/toastStore";
import { usersKeys } from "../queryKeys/usersKeys";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: usersKeys.list(),
      });

      const previousUsers = queryClient.getQueryData(usersKeys.list());

      queryClient.setQueryData(usersKeys.list(), (oldData) => {
        if (!oldData) return oldData;

        const users = oldData?.data?.users || [];

        return {
          ...oldData,
          data: {
            ...oldData.data,
            users: users.map((user) =>
              user.id === id ? { ...user, ...data } : user,
            ),
          },
        };
      });

      queryClient.setQueryData(usersKeys.list(), (oldData) => {
        if (!oldData) return oldData;

        const users = oldData?.data?.users || [];

        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...data } : user,
        );

        return {
          ...oldData,
          data: {
            ...oldData.data,
            users: updatedUsers,
          },
        };
      });

      return { previousUsers };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(usersKeys.list(), context.previousUsers);
    },

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(usersKeys.list(), (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            users: oldData.data.users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user,
            ),
          },
        };
      });
    },

    // Dummy JSON does not persist updates. When refetched, the original data restores. For real backend, keep invalidate queries.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.list() });
    },
  });
}
