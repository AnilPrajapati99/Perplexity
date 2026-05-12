import { ArrowRightToLine, Brain } from 'lucide-react'
import React from 'react'
import Userdetailse from './Userdetailse'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebar ,setActiveTab} from '../chat.slice'

const Sidebar = ({openChat,handleNewchat}) => {
    const {user} = useSelector(state => state.auth)
    const {showSidebar,activeTab,chats} = useSelector(state=>state.chat)
    const dispatch = useDispatch()


  return (
   <aside   className={`
    fixed top-0 left-0 h-full z-50 bg-neutral-900
    border-r border-neutral-700 flex flex-col
    transition-transform duration-300
    w-[60%] sm:w-1/2
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static
    md:flex md:w-1/3 lg:w-1/5 xl:w-1/5 2xl:w-1/7
  `}
>
        {/* Logo/Title */}

        <div className='px-4 py-2 md:py-4'>
        <div className='mb-5 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-white hidden md:block'>PromptIQ</h1>
          <h2 className='md:hidden'><Brain color='white' size={30} /></h2>
<div onClick={()=>dispatch(setSidebar(false))} className='transition-all ease-in-out duration-200 hover:bg-gray-800 w-fit rounded-xl p-2 block md:hidden' >
    <ArrowRightToLine  className={`transition-transform duration-300 ${showSidebar ? "rotate-180" : "rotate-0"}`}   color='white' size={30} />
  </div>
        </div>

        {/* New Chat Button */}

       <button onClick={handleNewchat} className='cursor-pointer w-full mb-5 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-semibold transition-all duration-200 mt-4'>
          + New Chat
        </button>
        {/* Chat History */}
        <div className='flex-1 overflow-y-auto space-y-3'>
          <h1 className='text-white text-xl font-bold'>Recents</h1>
          {Object.values(chats).map((chat, index) => (
            <button
            onClick={()=>openChat(chat._id,chat.title)}
              key={index}
              className={`w-full cursor-pointer px-4 py-3 text-left   rounded-lg text-white text-sm transition-colors duration-200 truncate border border-neutral-600 ${activeTab == chat.title ? "bg-neutral-500" : "bg-neutral-700"} `}
            >
              {chat.title}
            </button>
          ))}
        </div>
        </div>


          {/* user details */}
          <Userdetailse user={user}/>
      </aside>
  )
}

export default Sidebar
