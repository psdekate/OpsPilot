import useToastStore from "../store/toastStore";

export default function useUserActions({
  updateMutation,
  deleteMutation,
  selectedUser,
  userToDelete,
  setIsModalOpen,
  setIsDeleteOpen,
}) {
  const showToast = useToastStore((state) => state.showToast);

  function handleSave(updatedData) {
    updateMutation.mutate(
      {
        id: selectedUser.id,
        data: updatedData,
      },
      {
        onSuccess() {
          showToast("User updated successfully");
        },
      },
      {
        onError() {
          showToast("Update failed");
        },
      },
    );
    setIsModalOpen(false);
  }

  function confirmDelete() {
    (deleteMutation.mutate(userToDelete.id),
      {
        onSuccess() {
          showToast("User deleted successfully");
        },
      },
      {
        onError() {
          showToast("Delete failed");
        },
      });
    setIsDeleteOpen(false);
  }

  return { handleSave, confirmDelete };
}
