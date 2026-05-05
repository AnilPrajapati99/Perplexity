import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Chat must belong to a user"],
    },
    title: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Creates createdAt and updatedAt automatically
  },
);

// Index for faster queries
chatSchema.index({ user: 1, createdAt: -1 });
chatSchema.index({ user: 1, isPinned: -1, createdAt: -1 });

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
