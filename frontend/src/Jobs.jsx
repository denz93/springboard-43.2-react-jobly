import { useState } from "react";
import { useDebounceValue, useJobs } from "./hooks";
import JobList from "./JobList";
import JobPlaceholder from './JobPlaceholder'
function Jobs() {
  const [term, setTerm] = useState('')
  const searchValue = useDebounceValue(term)
  const {jobs, isLoading, isSuccess} = useJobs(searchValue)

  return (
    <section className="m-auto py-8 px-32 ">
      <div className="flex justify-center mb-8">

        <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Search by term" className="py-2 px-4  rounded-full focus:outline-slate-900 text-slate-700 text-center"/>
      </div>
      {isSuccess &&<JobList jobs={jobs} />}
      {isLoading && <>
        <JobPlaceholder/>
        <JobPlaceholder/>
        <JobPlaceholder/>
      </>}
    </section>
  );
}

export default Jobs;