import {Outlet, NavLink, Link} from 'react-router-dom'
import { useAuth } from './hooks'
function App() {
  const {isLoggedin, user, logout} = useAuth()
  return <>
    <header>
      <nav className='flex gap-4 justify-items-end p-4'>
        <h1 className='mr-auto font-bold text-2xl'>
          <Link to={'/'}>
          JOBLY
          </Link>
        </h1>
        {
          isLoggedin && <>
            <NavLink to={'/companies'} className={'group'}><span className='group-[.active]:font-bold'>Companies</span></NavLink>
            <NavLink to={'/jobs'} className={'group'}><span className='group-[.active]:font-bold'>Jobs</span></NavLink>
            <NavLink to={'/profile'} className={'group'}><span className='group-[.active]:font-bold'>Profile</span></NavLink>
            <a href='#' onClick={() => logout()}>Log out {user.username}!</a>
          </>
        }

        {
          !isLoggedin && <>
            <NavLink to={'/signup'} className={'group'}><span className='group-[.active]:font-bold'>Sign Up</span></NavLink>
            <NavLink to={'/signin'} className={'group'}><span className='group-[.active]:font-bold'>Log In</span></NavLink>
          </>
        }

      </nav>
    </header>
    <main>
      <Outlet/>
    </main>
    <footer></footer>
  </>
}

export default App
