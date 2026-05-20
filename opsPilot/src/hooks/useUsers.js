import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/usersApi";

export default function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
