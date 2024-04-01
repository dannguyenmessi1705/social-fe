import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../../api/authentication";
import toast from "react-hot-toast";

function useSignin() {
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLogingIn } = useMutation({
    mutationFn: ({ email, password }) => signin(email, password),
    onSuccess: (data) => {
      toast.success("Login successful");
      queryClient.setQueryData(["user"], data.data);
      // localStorage.setItem("token", data.data.accessToken);
      // localStorage.setItem("userId", data.data.userId);
      localStorage.setItem("user", JSON.stringify(data.data));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isLogingIn };
}

export default useSignin;
