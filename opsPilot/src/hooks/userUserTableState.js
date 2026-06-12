import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useUserTableState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const userSearch = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [searchInput, setSearchInput] = useState(userSearch);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  //debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("search", searchInput);
        params.set("page", 1);
        return params;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setSearchInput(userSearch);
  }, [userSearch]);

  return {
    searchParams,
    setSearchParams,
    userSearch,
    page,
    searchInput,
    setSearchInput,
    sortConfig,
    setSortConfig,
  };
}
