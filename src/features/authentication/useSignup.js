import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../api/authentication";
import toast from "react-hot-toast";

function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Signup successful");
      navigate("/signin");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signup, isSigningUp };
}

export default useSignup;
