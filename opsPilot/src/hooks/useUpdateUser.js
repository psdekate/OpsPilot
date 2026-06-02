import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/usersApi";
import useToastStore from "../store/toastStore";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: updateUser,

    onMutate: async ({ id, data }) => {
      console.log("onMutate", id, data);

      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (oldData) => {
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

      queryClient.setQueryData(["users"], (oldData) => {
        if (!oldData) return oldData;

        const users = oldData?.data?.users || [];

        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...data } : user,
        );
        console.log(
          "Updated user in cache:",
          updatedUsers.find((u) => u.id === id),
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
      queryClient.setQueryData(["users"], context.previousUsers);

      showToast("Update failed - reverted");
    },

    onSuccess: (data) => {
      showToast("User updated successfully");
      console.log("User updated successfully");
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["users"] });
    // },
  });
}
