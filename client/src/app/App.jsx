import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes.jsx"
import { useAuth } from "../feauters/auth/hook/useAuth.js"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { WithSuspense } from "./components/WithSuspense.jsx"
function App() {
  const {handleGetMee} = useAuth()

  useEffect(()=>{
    handleGetMee()
  },[])

  return (
    <WithSuspense>
    <RouterProvider router={router} />
    </WithSuspense>

  )
}

export default App
