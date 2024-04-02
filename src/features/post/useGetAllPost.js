import { useQuery } from "@tanstack/react-query";
import { getPosts as getPostsApi } from "../../api/post";

function useGetAllPost() {
  const { data, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsApi,
  });
  const posts = data?.data;
  return { posts, isLoadingPosts };
}

export default useGetAllPost;
