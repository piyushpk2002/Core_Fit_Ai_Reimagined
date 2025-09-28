import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AppLayout from "./pages/AppLayout"
import Signup from "./pages/Signup"
import UserDetails from "./pages/UserDetails"
import ImageRecommendation from "./pages/ImageRecommendation"
import AuthLayout from "./pages/AuthLayout"
import Login from "./pages/Login"
import Details from "./pages/Details"
import UserTodo from "./pages/UserTodo"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkAuth } from "./store/features/authSlice"
import MedicalAnalysis from "./pages/MedicalAnalysis"


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()).then((res) => {
        console.log(res.payload);
        res?.payload?.statusCode === 402 ? alert(res?.payload?.message) : null;
    })
}, [dispatch])
  return (
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="userdetails" element={<UserDetails />} />
          <Route path="imageRecomendation" element={<ImageRecommendation />} />
          <Route path="details" element={<Details />} />
          <Route path="todo" element={<UserTodo />} />
          <Route path ="medicalAnalysis" element = {<MedicalAnalysis />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />} >
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
  )
}

export default App
