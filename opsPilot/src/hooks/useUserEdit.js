import { useState } from "react";

export default function useUserEdit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  function handleEdit(user) {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  return {
    isModalOpen,
    setIsModalOpen,
    selectedUser,
    handleEdit,
  };
}
