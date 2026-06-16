import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/usersApi";
import { usersKeys } from "../queryKeys/usersKeys";

export default function useUsers() {
  return useQuery({
    queryKey: usersKeys.list(),
    queryFn: getUsers,
  });
}
