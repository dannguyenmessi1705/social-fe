import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  likePost as likePostApi,
  unlikePost as unlikePostApi,
} from "../../api/post";
function useLikePost() {
  const queryClient = useQueryClient();
  const { mutate: likePost, isPending: isLikingPost } = useMutation({
    mutationFn: (postId) => likePostApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
      console.error("Failed to like post");
    },
  });
  const { mutate: unlikePost, isPending: isUnlikingPost } = useMutation({
    mutationFn: (postId) => unlikePostApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
      console.error("Failed to unlike post");
    },
  });
  return { likePost, isLikingPost, unlikePost, isUnlikingPost };
}

export default useLikePost;
