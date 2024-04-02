import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout as signoutApi } from "../../api/authentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signout, isPending: isSigningOut } = useMutation({
    mutationFn: signoutApi,
    onSuccess: () => {
      toast.success("Signout successful");
      queryClient.removeQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signout, isSigningOut };
}

export default useSignout;
