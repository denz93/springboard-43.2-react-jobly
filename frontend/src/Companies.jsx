import { useCompanies, useDebounceValue } from "./hooks";
import { useState } from "react";
import {Link} from 'react-router-dom';
import JobPlaceholder from "./JobPlaceholder";

function Companies() {
  const [search, setSearch] = useState('')
  const searchValue = useDebounceValue(search, 300)
  const {companies, isLoading} = useCompanies(searchValue)
  if (isLoading) {
    return <div className="m-auto">
        <div className="flex flex-col items-center gap-8">
          <input className="py-2 px-4 rounded-full focus:outline-slate-900 text-slate-700 text-center" type="text" autoFocus placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)}/>

          <JobPlaceholder/>
          <JobPlaceholder/>
          <JobPlaceholder/>

        </div>
    </div>
  }
  if (companies.length === 0) {
    return <div className="m-auto">
        <div className="flex flex-col items-center gap-8">
          <input className="py-2 px-4 rounded-full focus:outline-slate-900 text-slate-700 text-center" type="text" autoFocus placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)}/>
          <p className="italic opacity-50">No companies matched against <span className="font-bold">&quot;{search}&quot;</span></p>
        </div>
    </div>
  }
  return (
    <div className="m-auto">
      <div className="flex justify-center mb-8">
        <input className="py-2 px-4 rounded-full focus:outline-slate-900 text-slate-700 text-center" type="text" autoFocus placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)}/>
      </div>
      <ul className="flex flex-col">
        {companies.map(company => (
          <li key={company.handle} >
            <Link to={`/companies/${company.handle}`} className=" block py-8 px-4 hover:bg-gray-800 hover:cursor-pointer">
              <h2 className="text-3xl">{company.name}</h2>
              <p>{company.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;