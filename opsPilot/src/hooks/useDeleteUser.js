import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/usersApi";
import useToastStore from "../store/toastStore";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const showToast = useToastStore((s) => s.showToast);

  return useMutation({
    mutationFn: deleteUser,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old) => {
        if (!old) return old;

        const users = old.data?.users || [];

        return {
          ...old,
          data: {
            ...old.data,
            users: users.filter((u) => u.id !== id),
          },
        };
      });
      return { previousUsers };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(["users"], context.previousUsers);
      showToast("Delete failed - reverted");
    },

    onSuccess: () => {
      showToast("User deleted");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
