import { useEffect, useState } from "react";

export default function EditUserModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        email: user.email,
      });
    }
  }, [user]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <div>
      <div>
        <h2>Edit User</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Save</button>
          <button onClick={onClose} type="button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
