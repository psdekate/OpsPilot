export default function useUserActions({
  updateMutation,
  deleteMutation,
  selectedUser,
  userToDelete,
  setIsModalOpen,
  setIsDeleteOpen,
}) {
  function handleSave(updatedData) {
    updateMutation.mutate({
      id: selectedUser.id,
      data: updatedData,
    });
    setIsModalOpen(false);
  }

  function confirmDelete() {
    deleteMutation.mutate(userToDelete.id);
    setIsDeleteOpen(false);
  }

  return { handleSave, confirmDelete };
}
