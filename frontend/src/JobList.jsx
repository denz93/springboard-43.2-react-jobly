import { useApplyMutation, useUser } from "./hooks";

// eslint-disable-next-line react/prop-types
function JobList({jobs = []}) {
  const {user} = useUser()
  const applications = user ? user.applications : []
  const isApplied = (id) => applications ? applications.includes(id) : false
  const {mutate: applyJob} = useApplyMutation()
  return (
    <ul className="flex flex-col gap-6 mt-6">
        {jobs.length > 0 &&jobs.map(job => (
          <li key={job.id} className="py-4 px-4 bg-slate-700 bg-opacity-20 flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-300">{job.title}</h3>
            <p>Salary: {job.salary}</p>
            <p>Equity: {job.equity}</p>
            <button className="bg-slate-500 bg-opacity-20 hover:bg-slate-700 text-slate-300 font-bold py-2 px-4 rounded self-end" onClick={() => applyJob(job.id)}>{isApplied(job.id) ? "Applied" : "Apply"}</button>
          </li>
        ))}
        {jobs.length === 0 && <p className="py-4 px-4 italic self-center opacity-50">No jobs found</p>}
      </ul>
  );
}

export default JobList;