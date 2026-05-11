import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChat } from '../hooks/useChat'
import { MarkdownRenderer } from './MarkdownRenderer'
import Aianimation from '../components/Aianimation'
import { setEmptyChat } from '../chat.slice'
import { useDispatch } from 'react-redux'
import Userdetailse from '../components/Userdetailse'
import { ArrowRightToLine } from 'lucide-react';
import { Brain } from 'lucide-react';

const Dashboard = () => {
  const {user} = useSelector(state => state.auth)
  const { initialiseSocketConnection,handleSendMessage ,handleFetchChats,handleOpenChat} = useChat()
  const { chats ,currentChatId} = useSelector((state) => state.chat)
const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [activeTab,setActiveTab] = useState("")
  const [showSidebar,setSidebar] = useState(false)
  const [open, setOpen] = useState(false)

console.log(chats)

const dispatch = useDispatch()
  

  useEffect(() => {
    initialiseSocketConnection()
    handleFetchChats()
  }, [])

const handleSubmitMessage = async () => {
  if (!inputValue.trim()) return;
  const inputMessaege = inputValue
  setInputValue("")

  try {
    await handleSendMessage({
      message: inputMessaege,
      chatId: currentChatId,

    });
console.log("click")
setInputValue("");
   


  } catch (error) {
    setInputValue(inputMessaege);
    console.log(error);
  }
};

const openChat =async (chatId,title) => {
 await handleOpenChat(chatId,chats)
 setActiveTab(title)
}

function handleNewchat() {
  setInputValue("")
  setActiveTab("")
  dispatch(setEmptyChat())
}


  return (
    <main className='main2 h-screen w-screen flex bg-neutral-900'>
      {/* Sidebar */}
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
<div onClick={()=>setSidebar(false)} className='transition-all ease-in-out duration-200 hover:bg-gray-800 w-fit rounded-xl p-2 block md:hidden' >
    <ArrowRightToLine  className={`transition-transform duration-300 ${open ? "rotate-0" : "rotate-180"}`}   color='white' size={30} />
  </div>
        </div>

        {/* New Chat Button */}

       <button onClick={handleNewchat} className='w-full mb-5 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-semibold transition-all duration-200 mt-4'>
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




      {/* Main Chat Area */}
<section className='flex-1 flex flex-col '>

{/* Show Sidebar Toggle */}

  <div onClick={()=>setSidebar(true)} className='m-2 transition-all ease-in-out duration-200 hover:bg-gray-800 w-fit rounded-xl p-2 block md:hidden' >
    <ArrowRightToLine className={`transition-transform duration-300 ${showSidebar ? "rotate-180" : "rotate-0"}`} color='white' size={30} />
  </div>


  {/* Scroll Area */}
  <div className='main overflow-y-auto'>
    
    {/* Content Wrapper */}

    <div className='max-w-screen   sm:max-w-screen md:max-w-2xl lg:max-w-screen xl:max-w-4xl 2xl:max-w-4xl mx-auto p-8  space-y-4 '>
      {!chats[currentChatId]?.messages ? <>
      
      </> : ""}
      {chats[currentChatId]?.messages?.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user"
              ? "justify-end "
              : "justify-start"
          }`}
        >
          <div
            className={` py-3 rounded-[20px] max-w-[min(100%,42rem)] break-words  ${
              message.role === "user"
                ? "bg-[#1E1D1B] text-white"
                : " text-white"
            }`}
          >
            {message.role === "user" ? (
              <h2 className='whitespace-pre-wrap px-5  overflow-wrap-anywhere '>
                {message.content}
              </h2>
            ) : (
              <div className='w-full  min-w-0'>
                <MarkdownRenderer content={message.content} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>


<div className="pb-6  px-4  mt-auto ">
  <div className="flex  pb-6 mt-auto flex-col max-w-4xl sm:max-w-screen mx-auto gap-5 md:gap-8   border border-neutral-700 rounded-[20px] px-5 md:px-8 py-6 md:py-8 md:max-w-3xl xl:max-w-4xl 2xl:max-w-4xl">
    

      {/* Input Style */}

    <div>
      <input
      type="text"
      placeholder="Ask me anything..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className=" text-white bg-transparent focus:outline-none  text-2xl placeholder-gray-500"
    />
    </div>

      {/* Button Style */}

    <div className='flex justify-end'>
      <button
      disabled={!inputValue.trim()}
      onClick={handleSubmitMessage}
      className={` px-4
        py-3
        bg-blue-600
        hover:bg-blue-700
        rounded-lg
        text-white
        font-semibold
        transition-colors
        duration-200
        flex
        items-center
        justify-center
        ${!inputValue.trim() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <Send size={20} />
    </button>
    </div>

  </div>
</div>


</section>
    </main>
  )
}

export default Dashboard
