import { useAuth } from "./hooks.js";
import React from "react";
// eslint-disable-next-line react/prop-types
export const AuthGuard = ({children}) => {
  const {isLoggedin} = useAuth()
  if (!isLoggedin) {
    return <div className="text-center italic">You are not allowed to view this page</div>
  }
  return <>
    {children}
  </>
}
export const AuthGuardFor = (component) => {
  // eslint-disable-next-line react/display-name
  return () => <AuthGuard>{React.createElement(component, null)}</AuthGuard>
}
