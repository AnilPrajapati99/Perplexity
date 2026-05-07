import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {
  const { initialiseSocketConnection,handleSendMessage ,handleFetchChats,handleOpenChat} = useChat()
  const { chats ,currentChatId} = useSelector((state) => state.chat)
const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')


  console.log(chats)

  

  useEffect(() => {
    initialiseSocketConnection()
    handleFetchChats()
  }, [])

const handleSubmitMessage = async () => {
  if (!inputValue.trim()) return;

  try {
    await handleSendMessage({
      message: inputValue,
      chatId: currentChatId,

    });
console.log("click")
    setInputValue("");


  } catch (error) {
    console.log(error);
  }
};

const openChat =async (chatId) => {
 await handleOpenChat(chatId,chats)
}

  return (
    <main className='h-screen w-full flex bg-neutral-900'>
      {/* Sidebar */}
      <aside className='w-1/4 bg-neutral-800 border-r border-neutral-700 p-4 flex flex-col'>
        {/* Logo/Title */}
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-white'>Perplexity</h1>
        </div>

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

        {/* New Chat Button */}
        <button className='w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-semibold transition-all duration-200 mt-4'>
          + New Chat
        </button>
      </aside>

      {/* Main Chat Area */}
<section className='flex-1 flex flex-col'>

  {/* Scroll Area */}
  <div className='flex-1 overflow-y-auto'>
    
    {/* Content Wrapper */}
    <div className='w-[80%] mx-auto  p-6 space-y-4'>
      {chats[currentChatId]?.messages?.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-xl px-4 py-3 rounded-lg ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {message.role === "user" ? (
              <p className='whitespace-pre-wrap break-words'>
                {message.content}
              </p>
            ) : (
              <div className='prose prose-sm max-w-none'>
                <ReactMarkdown
                  components={{
                    pre: ({ children }) => (
                      <pre className="whitespace-pre-wrap break-words overflow-hidden bg-gray-800 text-white p-4 rounded-lg">
                        {children}
                      </pre>
                    ),
                    code: ({ children }) => (
                      <code className="whitespace-pre-wrap break-words">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Input */}
<div className="p-6 mt-auto border-t border-neutral-700">
  <div className="flex items-center gap-3">
    
    <input
      type="text"
      placeholder="Chat input area"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="
        flex-1
        px-4
        py-3
        bg-neutral-800
        border
        border-neutral-700
        rounded-lg
        text-white
        placeholder-neutral-500
        focus:outline-none
        focus:border-blue-500
        focus:ring-1
        focus:ring-blue-500
      "
    />

    <button
      onClick={handleSubmitMessage}
      className="
        px-4
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
      "
    >
      <Send size={20} />
    </button>

  </div>
</div>

</section>
    </main>
  )
}

export default Dashboard
