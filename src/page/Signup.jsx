import SignUpForm from "../features/authentication/SignUpForm";

function Signup() {
  return (
    <section className="flex h-[100dvh] items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Create new account
        </h1>
        <SignUpForm />
      </div>
    </section>
  );
}

export default Signup;
