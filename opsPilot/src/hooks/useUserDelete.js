import { useState } from "react";

export default function useUserDelete() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  function handleDeleteClick(user) {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  }

  return {
    isDeleteOpen,
    setIsDeleteOpen,
    userToDelete,
    handleDeleteClick,
  };
}
