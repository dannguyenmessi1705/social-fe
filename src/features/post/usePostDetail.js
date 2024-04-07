import { useQuery } from "@tanstack/react-query";
import { getDetailPost } from "../../api/post";

function usePostDetail(postId) {
  const { data, isLoading: isLoadingPostDetail } = useQuery({
    queryKey: ["post-detail", postId],
    queryFn: () => getDetailPost(postId),
  });
  const postDetail = data?.data || null;
  return { postDetail, isLoadingPostDetail };
}

export default usePostDetail;
