import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment as postCommentApi } from "../../api/comment";

function usePostComment() {
  const queryClient = useQueryClient();
  const { mutate: postComment, isPending: isPostingComment } = useMutation({
    mutationFn: ({ comment, postId }) => postCommentApi(comment, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { postComment, isPostingComment };
}

export default usePostComment;
