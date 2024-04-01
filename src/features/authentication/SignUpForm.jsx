import { useForm } from "react-hook-form";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

function SignUpForm() {
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm();

  const { signup, isSigningUp } = useSignup();

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("fullName", data.fullName);
    formData.append("birthday", data.dob);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);
    signup(formData);
    reset();
  };

  return (
    <form
      className="space-y-4 p-5 md:space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label
          htmlFor="fullName"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Full Name
        </label>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", {
            required: "Full name is required",
          })}
        />
        {errors.fullName && <span>{errors.fullName.message}</span>}
      </div>
      <div>
        <label
          htmlFor="birthday"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Date of birth
        </label>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          type="date"
          id="birthday"
          disabled={isSigningUp}
          {...register("birthday", {
            required: "Date of birth is required",
          })}
        />
        {errors.dob && <span>{errors.dob.message}</span>}
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          disabled={isSigningUp}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <label
          htmlFor="avatar"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Avatar
        </label>
        <input
          type="file"
          id="avatar"
          disabled={isSigningUp}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          {...register("avatar", {
            required: "Avatar is required",
          })}
        />
        {errors.avatar && <span>{errors.avatar.message}</span>}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {isSigningUp ? <SpinnerMini /> : "Sign up"}
      </button>
    </form>
  );
}

export default SignUpForm;
