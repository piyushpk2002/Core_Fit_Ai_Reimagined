import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import loader from "../assets/loader_elephant.gif"

function AppLayout() {
  const { isLoading } = useSelector(state => state.auth)
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-r from-black via-blue-950 to-black text-white">
      {
         isLoading ? <div className="absolute bg-[rgb(255,255,255,0.3)] backdrop-blur-sm h-screen w-full flex justify-center items-center">
          <img src={loader} alt="" className='h-60' />
         </div> : null
      }
        <Header />
        <Outlet />
    </div>
  )
}

export default AppLayout
