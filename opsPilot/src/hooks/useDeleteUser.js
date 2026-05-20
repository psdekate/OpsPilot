import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/usersApi";
import useToastStore from "../store/toastStore";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      showToast("User deleted successfully");
    },
  });
}
