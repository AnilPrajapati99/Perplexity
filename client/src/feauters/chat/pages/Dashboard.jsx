import React ,{ useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {
  const {initialiseSocketConnection} = useChat()
    const {user} = useSelector((state)=>state.auth)
    console.log(user)

    useEffect(()=>{
      initialiseSocketConnection()
    },[])

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
