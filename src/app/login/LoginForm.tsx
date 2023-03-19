import Link from 'next/link';

export default function LoginForm() {
  return (
    <section className="basis-1/2">
      <h1 className="m-2 text-3xl font-semibold text-gray-500">Login</h1>
      <form className="space-y-2 p-4">
        <div>
          <label htmlFor="username" className="text-gray-400">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mb-6 block w-full rounded-md"
          />
        </div>
        <div className="flex justify-center space-x-2">
          <button
            type="submit"
            className="h-11 w-full  rounded-3xl bg-blue-700 text-white"
          >
            Login
          </button>

          <button
            type="button"
            className="h-11 w-full rounded-3xl bg-green-700 text-white"
          >
            <Link href={'/signup'}>Signup</Link>
          </button>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="h-11 w-full rounded-3xl bg-blue-700 text-white"
          >
            Google
          </button>
        </div>
      </form>
    </section>
  );
}
