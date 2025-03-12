import AdminLayout from "./components/admin-view/layout"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import { Routes, Route } from "react-router-dom"
import CheckAuth from "./components/common/check-auth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"
import Home from "./pages/admin-view/home"
import File from "./pages/admin-view/file"
import Messages from "./pages/admin-view/message"
import Notification from "./pages/admin-view/notification"
import Location from "./pages/admin-view/location"
import Graph from "./pages/admin-view/graph"

function App() {

  // const isAuthenticated = false;
  // const user = null;

  const {isAuthenticated, user, isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect (()=>{
    dispatch(checkAuth())
  },[dispatch])

  // if (isLoading)  return <Skeleton className="w-[800px] h-[600px] bg-black " />


  console.log(isLoading, user);
  
  return (
    <div className="flex flex-col overflow-hidden bg-white">
 
      <Routes>
        <Route 
          path="/auth" 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout/>
            </CheckAuth>
          }>
          <Route path="login" element={<AuthLogin/>} />
          <Route path="register" element={<AuthRegister/>} />
        </Route>

        <Route
          path="/admin" 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout/>
            </CheckAuth>
        }>
          <Route path="home" element={<Home/>} />
          <Route path="file" element={<File/>} />
          <Route path="messages" element={<Messages/>} />
          <Route path="notification" element={<Notification/>} />
          <Route path="location" element={<Location/>} />
          <Route path="graph" element={<Graph/>} />
        </Route>  

      </Routes>

    </div>
    
  )
}

export default App
