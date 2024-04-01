import SignInForm from "../features/authentication/SignInForm";

function Signin() {
  return (
    <section className="flex h-[100dvh] items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
        <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <SignInForm />
      </div>
    </section>
  );
}

export default Signin;
