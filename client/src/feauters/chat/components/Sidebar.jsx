import { ArrowRightToLine, Brain } from 'lucide-react'
import React from 'react'
import Userdetailse from './Userdetailse'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebar ,setActiveTab,deleteChat as deletechats} from '../chat.slice'
import { useChat } from '../hooks/useChat'
import { MdDeleteForever } from "react-icons/md";

const Sidebar = ({openChat,handleNewchat}) => {
  const {handleDelete} = useChat()
    const {user} = useSelector(state => state.auth)
    const {showSidebar,activeTab,chats} = useSelector(state=>state.chat)
    const dispatch = useDispatch()

    async function deleteChat(e,chatid){
       e.stopPropagation();
      console.log("log",chatid)
      try {
        await handleDelete(chatid)
        dispatch(deletechats(chatid))
      } catch (error) {
        console.log("Delete Failed",error)
      }
    }


  return (
<aside style={{height:"100dvh"}} className={`
  fixed top-0 left-0 h-full z-50 bg-neutral-900
  border-r border-neutral-700 flex flex-col
  transition-transform duration-300
  w-[60%] sm:w-1/2
  ${showSidebar ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0 md:static
  md:flex md:w-1/3 lg:w-1/4 xl:w-1/5
`}>

  {/* TOP */}
  <div className="flex items-center justify-between px-4 py-4 shrink-0">
    <h1 className="text-2xl font-bold text-white hidden md:block">PromptIQ</h1>
    <h2 className="md:hidden"><Brain color="white" size={30} /></h2>
    <div onClick={() => dispatch(setSidebar(false))}
      className="transition-all ease-in-out duration-200 hover:bg-gray-800 w-fit rounded-xl p-2 block md:hidden">
      <ArrowRightToLine className={`transition-transform duration-300 ${showSidebar ? "rotate-180" : "rotate-0"}`} color="white" size={30} />
    </div>
  </div>

  {/* MIDDLE */}
  <div className="flex flex-col flex-1 overflow-hidden">
    
    <div className="px-4">
          <button onClick={handleNewchat}
      className="cursor-pointer w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-200 mb-4 shrink-0">
      + New Chat
    </button>
      <h1 className="text-white text-xl font-bold mb-3 shrink-0">Recents</h1>
    </div>

   
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-3 px-4 pb-3"> 
        {Object.values(chats).map((chat, index) => (
        <div
          onClick={() => openChat(chat._id, chat.title)}
          key={chat._id}
          className={`w-full flex justify-between cursor-pointer px-4 py-3 text-left rounded-lg text-white text-sm transition-colors duration-200  border border-neutral-600 shrink-0
            ${activeTab === chat.title ? "bg-neutral-500" : "bg-neutral-700"}`}
        >
          <p className='truncate flex-1 mr-2'>{chat.title}</p>
          <button onClick={(e)=>{
            deleteChat(e,chat._id)}}><MdDeleteForever className='hover:text-red-500  transition-all ease-in-out duration-200' size={20}/></button>
        </div>
        ))}
      </div>
    </div>

  </div>

  {/* BOTTOM */}
  <div className="shrink-0">
    <Userdetailse user={user} />
  </div>

</aside>
  )
}

export default Sidebar


