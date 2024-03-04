import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import Companies from "./Companies.jsx";
import Jobs from "./Jobs.jsx";
import Profile from "./Profile.jsx";
import Home from "./Home.jsx";
import Company from './Company.jsx';
import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";
import { AuthGuardFor } from "./AuthGuard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "companies",
        Component: AuthGuardFor(Companies),
      },
      {
        path: "companies/:handle",
        Component: AuthGuardFor(Company),
      },
      {
        path: "jobs",
        Component: AuthGuardFor(Jobs),
      },
      {
        path: "profile",
        Component: AuthGuardFor(Profile),
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "signin",
        Component: Signin,
      },
    ],
  }
]) 


export default router