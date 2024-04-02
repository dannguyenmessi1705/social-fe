import { useQuery } from "@tanstack/react-query";
import { getPosts as getPostsApi } from "../../api/post";

function useGetAllPost() {
  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsApi,
  });
  return { posts, isLoadingPosts };
}

export default useGetAllPost;
