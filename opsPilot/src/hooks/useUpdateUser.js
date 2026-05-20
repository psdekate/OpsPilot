import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastStore from "../store/toastStore";
import { updateUser } from "../services/usersApi";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      showToast("User updated successfully");
    },
  });
}
