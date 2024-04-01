import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/authentication";

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { user, isLoading };
}

export default useUser;
