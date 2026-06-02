import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useUserTableState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const userSearch = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [searchInput, setSeachInput] = useState(userSearch);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  return {
    searchParams,
    setSearchParams,
    userSearch,
    page,
    searchInput,
    setSeachInput,
    sortConfig,
    setSortConfig,
  };
}
