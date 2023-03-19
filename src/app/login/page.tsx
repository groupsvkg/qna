import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-3/4 w-4/5 flex-col rounded-md border-2 shadow-md md:h-1/2 md:w-1/2 md:flex-row">
        <LoginForm />
        <section className="basis-1/2 bg-yellow-300">TODO</section>
      </div>
    </div>
  );
}
