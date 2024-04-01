import { Form, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignin from "./useSignin";

function SignInForm() {
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm();

  const { login, isLogingIn } = useSignin();

  const onSubmit = (data) => {
    const { email, password } = data;
    login({ email, password });
    reset();
  };

  return (
    <form className="space-y-4 md:space-y-6 p-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
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
          className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              required=""
            />
          </div>
          <div className="ml-3 text-sm">
            <label for="remember" class="text-gray-500 dark:text-gray-300">
              Remember me
            </label>
          </div>
        </div>
        <Link
          to="#"
          className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <button
        type="submit"
        className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
      >
        Sign in
      </button>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link
          to="#"
          className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default SignInForm;
