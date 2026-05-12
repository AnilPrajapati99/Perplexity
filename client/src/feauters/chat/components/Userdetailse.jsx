import React from 'react'
import { LogOut } from 'lucide-react';
import { useAuth } from '../../auth/hook/useAuth';
import { useNavigate } from 'react-router-dom';


const Userdetailse = ({user}) => {
    console.log(user)
const {  handleLogout} = useAuth()
const navigate = useNavigate()

 async function logout() {
  await handleLogout();
  console.log("logout");
  navigate("/login");
  console.log("navigate")
}

  return (
<div className=" mt-auto flex items-center justify-between  px-3 md:px-3 xl:px-4  py-3 border-t border-neutral-700">
  {/* Left side - Avatar + Info */}
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
      {user?.username?.charAt(0)}
    </div>
    <div className=''>
      <p className="text-white font-medium text-sm">{user?.username}</p>
      <p className="text-gray-400 text-xs">{user?.email}</p>
    </div>
  </div>

  {/* Right side - Logout */}
  <button onClick={logout} className="cursor-pointer text-white text-sm hover:text-red-400 active:scale-95 transition">
   <LogOut size={20} />
  </button>

</div>
  )
}

export default Userdetailse
