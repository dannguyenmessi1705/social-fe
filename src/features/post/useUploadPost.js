import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../api/post";
import { toast } from "react-hot-toast";

function useUploadPost() {
  const queryClient = useQueryClient();
  const { mutate: uploadPost, isPending: isUploadingPost } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Uploaded post successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return { uploadPost, isUploadingPost };
}

export default useUploadPost;
