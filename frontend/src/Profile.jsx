import { useUser, useUserMutation } from "./hooks";

function Profile() {
  const {user, isLoading, isSuccess} = useUser()
  const {mutate} = useUserMutation()

  if (isLoading) {
    return <section className="py-8 px-32 flex flex-col gap-6 items-center animate-pulse">
      {new Array(4).fill(0).map((_, index) => <div key={index} className="flex gap-2 flex-col">
        <div className="h-4 w-24 bg-slate-800"></div>
        <div className="h-8 w-48 bg-slate-800"></div>
      </div>
      )}
      
      <div className="h-8 w-48 bg-slate-800"></div>
    </section>
  }
  if (!isSuccess) {
    return <div className="text-center italic">You are not allowed to view this page</div>
  }
  return (
    <section className="py-8 px-32 flex flex-col items-center">
      <h1 className="text-3xl mb-12">Profile</h1>
      <form className="flex flex-col gap-6" onSubmit={(e) => {
        e.preventDefault()
        const isValid = e.currentTarget.reportValidity()
        if (!isValid) return;
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        mutate(data)
        }}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input defaultValue={user?.username} id="username" disabled type="text" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200 text-slate-800 disabled:opacity-30" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstname">First Name</label>
          <input required defaultValue={user?.firstName} id="firstname" name="firstName" type="text" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200 text-slate-800" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastname">Last Name</label>
          <input required defaultValue={user?.lastName} id="lastname" name="lastName" type="text" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200 text-slate-800" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input required defaultValue={user?.email} id="email" name="email" type="text" className="py-2 px-4 rounded focus:outline-slate-900 bg-zinc-200 text-slate-800" />
        </div>
        <button type="submit" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">Update</button>
      </form>
    </section>
  );
}

export default Profile;