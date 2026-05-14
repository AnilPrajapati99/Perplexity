import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes.jsx"
import { useAuth } from "../feauters/auth/hook/useAuth.js"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
function App() {
  const {handleGetMee} = useAuth()

  useEffect(()=>{
    handleGetMee()
  },[])

  return (
    <RouterProvider router={router} />

  )
}

export default App
