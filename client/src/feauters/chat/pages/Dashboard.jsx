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

const Dashboard = () => {
  const {user} = useSelector(state => state.auth)
  const { initialiseSocketConnection,handleSendMessage ,handleFetchChats,handleOpenChat} = useChat()
  const { chats ,currentChatId} = useSelector((state) => state.chat)
const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')


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

const openChat =async (chatId) => {
 await handleOpenChat(chatId,chats)
}

function handleNewchat() {
  setInputValue("")
  dispatch(setEmptyChat())
}


  return (
    <main className='main2 h-screen w-screen flex bg-neutral-900'>
      {/* Sidebar */}
      <aside className='hidden  bg-neutral-800 border-r border-neutral-700  md:flex  flex-col md:w-1/4 lg:w-1/5 xl:w-1/5 2xl:w-1/7'>
        {/* Logo/Title */}

        <div className='p-4'>
                  <div className='mb-5'>
          <h1 className='text-2xl font-bold text-white'>Perplexity</h1>
        </div>

        {/* New Chat Button */}

       <button onClick={handleNewchat} className='w-full mb-5 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-semibold transition-all duration-200 mt-4'>
          + New Chat
        </button>
        {/* Chat History */}
        <div className='flex-1 overflow-y-auto space-y-3'>
          {Object.values(chats).map((chat, index) => (
            <button
            onClick={()=>openChat(chat._id)}
              key={index}
              className='w-full cursor-pointer px-4 py-3 text-left bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white text-sm transition-colors duration-200 truncate border border-neutral-600'
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

  {/* Scroll Area */}
  <div className='main overflow-y-auto'>
    
    {/* Content Wrapper */}

    <div className='max-w-screen   sm:max-w-screen md:max-w-2xl lg:max-w-screen xl:max-w-4xl 2xl:max-w-4xl mx-auto p-8  space-y-4 '>
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
