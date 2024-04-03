import { useQuery } from "@tanstack/react-query";
import { getDetailUser } from "../../api/user";
function useUserDetail(userId) {
  const { data, isLoading: isLoadingUserDetail } = useQuery({
    queryKey: ["user-detail", userId],
    queryFn: () => getDetailUser(userId),
  });
  const userDetail = data?.data || null;
  return { userDetail, isLoadingUserDetail };
}

export default useUserDetail;
