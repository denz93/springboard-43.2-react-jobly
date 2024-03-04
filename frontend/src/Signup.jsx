import { useSignupMutation } from "./hooks";

function Signup() {
  const {mutate, isPending} = useSignupMutation()

  return (
    <section className="m-auto flex flex-col items-center">
      <h1 className="text-3xl mb-16">Sign up</h1>
      <form className="flex flex-col gap-6 " onSubmit={(e) => {
        e.preventDefault();
        const isValid = e.currentTarget.reportValidity()
        if (!isValid) return;

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        mutate(data)
      }}>
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input required id="username" name="username" type="text" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200" />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="password">Password</label>
          <input required type="password" id="password" name="password" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="firstname">First Name</label>
          <input id="firstname" name="firstName" type="text" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastname">Last Name</label>
          <input id="lastname" name="lastName" type="text" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input required minLength={6} id="email" name="email" type="text" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200" />
        </div>

        <button disabled={isPending} type="submit" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
      </form>
    </section>
  );
}

export default Signup;