'use client';

import { FormEvent } from 'react';

export default function SignupForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="flex h-1/2 w-1/4 flex-col rounded-md border-2 shadow-md">
        <h1 className="m-2 text-3xl font-semibold text-gray-500">Signup</h1>
        <form className="space-y-2 p-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
              Signup
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
