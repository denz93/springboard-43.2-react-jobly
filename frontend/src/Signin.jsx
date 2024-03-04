import { useSigninMutation } from "./hooks";

function Signin() {
  const {mutate, isPending} = useSigninMutation()
  return (
    <section className="flex flex-col items-center ">
      <h1 className="text-3xl mb-16">Sign in</h1>
      <form className="flex flex-col gap-4" onSubmit={(e) => {
        console.log('submitted')
        e.preventDefault();
        const isValid = e.currentTarget.reportValidity()
        console.log({isValid})
        if (!isValid) return;
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log({data})
        mutate(data)
      }}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input required id="username" name="username" type="text" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200" />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="password">Password</label>
            <input autoComplete="current-password" required type="password" id="password" name="password" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200" />
          </div>
          <button disabled={isPending} type="submit" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
        </div>
      </form>
    </section>
  );
}

export default Signin;