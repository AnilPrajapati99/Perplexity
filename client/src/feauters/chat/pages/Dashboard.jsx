import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChat } from '../hooks/useChat'
import { MarkdownRenderer } from './MarkdownRenderer'
import Aianimation from '../components/Aianimation'
import { setEmptyChat } from '../chat.slice'
import { useDispatch } from 'react-redux'
import { ArrowRightToLine } from 'lucide-react';
import Sidebar from '../components/Sidebar'
import { setSidebar ,setActiveTab} from '../chat.slice'
import { Greeting } from '../components/Greeting'


const Dashboard = () => {
  
  const { initialiseSocketConnection,handleSendMessage ,handleFetchChats,handleOpenChat} = useChat()
  const { chats ,currentChatId} = useSelector((state) => state.chat)
const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const {showSidebar,activeTab} = useSelector(state => state.chat)

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
 dispatch(setActiveTab(title))
}

function handleNewchat() {
  setInputValue("")
  dispatch(setActiveTab(""))
  dispatch(setEmptyChat())
}


  return (
    <main className='main2 h-screen w-screen flex bg-neutral-900'>

      {/* Sidebar */}
     
     <Sidebar openChat={openChat}  handleNewchat={handleNewchat}   />

      {/* Main Chat Area */}
<section className='flex-1 flex flex-col '>

{/* Show Sidebar Toggle */}

  <div onClick={()=>dispatch(setSidebar(true))} className='m-2 transition-all ease-in-out duration-200 hover:bg-gray-800 w-fit rounded-xl p-2 block md:hidden' >
    <ArrowRightToLine className={`transition-transform duration-300 ${showSidebar ? "rotate-180" : "rotate-0"}`} color='white' size={30} />
  </div>


  {/* Scroll Area */}
  <div className='main overflow-y-auto'>
    
    {/* Content Wrapper */}

    <div className='max-w-screen   sm:max-w-screen md:max-w-2xl lg:max-w-screen xl:max-w-4xl 2xl:max-w-4xl mx-auto p-8  space-y-4 '>
      {!chats[currentChatId]?.messages ? 
      <Greeting/> : ""}
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
  <div className="bg-[#2c2c2a] flex  pb-6 mt-auto flex-col max-w-4xl sm:max-w-screen mx-auto gap-5 md:gap-8    rounded-[20px] px-5 md:px-8 py-6 md:py-8 md:max-w-3xl xl:max-w-4xl 2xl:max-w-4xl">
    

      {/* Input Style */}

    <div>
      <input
      type="text"
      placeholder="Ask me anything..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className=" w-full wrap-break-word text-white bg-transparent focus:outline-none  text-2xl placeholder-gray-400"
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
