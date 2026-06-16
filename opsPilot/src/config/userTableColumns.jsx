import { PERMISSIONS } from "../constants/permissions";

export function getUserColumns({ canEdit, canDelete, onEdit, onDelete }) {
  return [
    { header: "First Name", accessor: "firstName", sortable: true },
    { header: "Last Name", accessor: "lastName", sortable: true },
    { header: "Email", accessor: "email", sortable: true },
    {
      header: "Actions",
      render: (row) => (
        <>
          {canEdit && <button onClick={() => onEdit(row)}>Edit</button>}

          {canDelete && <button onClick={() => onDelete(row)}>Delete</button>}
        </>
      ),
    },
  ];
}
