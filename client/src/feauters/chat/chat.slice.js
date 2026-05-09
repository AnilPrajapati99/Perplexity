import { createSlice, current } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
    value:null
  },
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        _id: chatId,
        title,
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
      // state.currentChatId = chatId;
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      state.chats[chatId].messages.push({
        content,
        role,
      });
    },
    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chats[chatId].messages.push(...messages);
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setEmptyChat: (state) => {
      state.currentChatId = null;
    }
  },
});

export const {
  setChats,
  setCurrentChatId,
  setIsLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
  setEmptyChat,
} = chatSlice.actions;

export default chatSlice.reducer;
