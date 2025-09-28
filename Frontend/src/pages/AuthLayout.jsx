import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <Outlet />
    </div>
  )
}

export default AuthLayout
