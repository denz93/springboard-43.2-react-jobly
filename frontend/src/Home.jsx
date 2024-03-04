import { Link, useNavigate} from "react-router-dom";
import { useAuth } from "./hooks";
import { useEffect } from "react";
function Home() {
  const {isLoggedin} = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedin) return 
    navigate('/companies')
  }, [isLoggedin, navigate])
  return (
    <div className="h-[calc(100vh-5rem)] flex justify-center items-center">
      <div className="w-96 text-center">
        <h1 className="text-6xl mb-10 font-mono">Jobly</h1>
        <p className="text-2xl mb-10">All the jobs in one, convenient place</p>
        <div className="flex gap-4 justify-center">
          <Link to={"/signin"}>   
            <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">Login</button>
          </Link>
          <Link to={"/signup"}>
            <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;