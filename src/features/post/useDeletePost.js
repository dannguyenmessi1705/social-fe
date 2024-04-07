import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deletePost as deletePostApi } from "../../api/post";
function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries("posts");
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });
  return { deletePost, isDeletingPost };
}

export default useDeletePost;
