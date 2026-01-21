import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    author: { type: String, default: "Your Name" },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    readingTime: { type: Number },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Blog", blogSchema);
