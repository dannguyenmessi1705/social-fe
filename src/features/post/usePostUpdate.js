import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost as updatePostApi } from "../../api/post";
import { toast } from "react-hot-toast";
function usePostUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updatePost, isPending: isUpdatingPost } = useMutation({
    mutationFn: ({ post, postId }) => updatePostApi(post, postId),
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });
  return { updatePost, isUpdatingPost };
}

export default usePostUpdate;
