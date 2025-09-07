import AdminLayout from "./components/admin-view/layout"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import { Routes, Route, Navigate } from "react-router-dom"
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
        {/* Root route - redirect based on auth status */}
        <Route 
          path="/" 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              {isAuthenticated ? <Navigate to="/admin/home" replace /> : <Navigate to="/auth/login" replace />}
            </CheckAuth>
          } 
        />

        <Route 
          path="/auth" 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <AuthLayout/>
            </CheckAuth>
          }>
          <Route path="login" element={<AuthLogin/>} />
          <Route path="register" element={<AuthRegister/>} />
        </Route>

        <Route
          path="/admin" 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
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

        {/* Catch-all route for undefined paths */}
        <Route 
          path="*" 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <Navigate to="/" replace />
            </CheckAuth>
          } 
        />

      </Routes>

    </div>
    
  )
}

export default App
