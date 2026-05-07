import { initialiseSocketConnection } from "../service/chat.service";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api.service";
import {
  setChats,
  setCurrentChatId,
  setError,
  setIsLoading,
  createNewChat,
  addNewMessage,
  addMessages,
} from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setIsLoading(true));
    const data = await sendMessage({ message, chatId });
    const { AIMessage, chat } = data;
    console.log(data);
    dispatch(createNewChat({ chatId: chat._id, title: chat.title }));
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: message,
        role: "user",
      }),
    );
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: AIMessage.content,
        role: AIMessage.role,
      }),
    );
    dispatch(setCurrentChatId(chat._id));
  }

  async function handleFetchChats() {
    dispatch(setIsLoading(true));
    const data = await getChats();
    dispatch(
      setChats(
        data.reduce((acc, chat) => {
          acc[chat._id] = {
            _id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setIsLoading(false));
  }

  async function handleOpenChat(chatId) {
    // dispatch(setIsLoading(true));
    const data = await getMessages(chatId);
    console.log(data);
    const { messages } = data;
    const formatMessages = messages.map((msg) => ({
      content: msg.content,
      role: msg.role,
    }));
    dispatch(addMessages({ chatId, messages: formatMessages }));
    dispatch(setCurrentChatId(chatId));
    // dispatch(setIsLoading(false));
  }

  return {
    initialiseSocketConnection,
    handleSendMessage,
    handleFetchChats,
    handleOpenChat,
  };
};
