import { useParams } from "react-router-dom";
import { useCompany } from "./hooks";
import JobList from "./JobList";
function Company() {
  const {handle} = useParams();
  const {company, isLoading} = useCompany(handle)
  if (isLoading) {
    return  <section className="m-auto py-4 px-8">
      
      <p className="italic animate-pulse">Loading</p>
    </section>
  }
  return (
    <section className="m-auto py-4 px-32">
      <h1 className="text-3xl">{company.name}</h1>
      <p className="italic">{company.description}</p>
      
      <JobList jobs={company.jobs}/>
    </section>
  );
}

export default Company;