import { useState } from "react"
import { useSelector } from "react-redux"

export function Greeting() {
  const { user } = useSelector(state => state.auth) // ya jahan tumhara user data hai
  
  const prompts = [
  "What can I help you with today?",
  "What's on your mind?",
  "Ask me anything ✨",
  "How can I assist you today?",
  "What would you like to explore?",
  "Ready when you are 🚀",
  "What are you curious about?",
  "Let's get started — what do you need?",
  "I'm all ears 👂 What's up?",
  "Got a question? Fire away 🔥"
]

const getRandomPrompt = () => {
  return prompts[Math.floor(Math.random() * prompts.length)]
}
const [prompt] = useState(() => getRandomPrompt()) 



  return (
 <div  className="flex  flex-col items-center justify-center gap-2">
  <h1 className="text-3xl font-bold text-white">
    Hi, {user?.username} 👋
  </h1>
  <p className="text-neutral-400 text-xl text-center">
    {prompt}
  </p>
</div>
  )
}