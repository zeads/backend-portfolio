import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    thumbnail: { type: String, required: true }, // URL Cloudinary
    description: { type: String, required: true },
    content: { type: String }, // Detail markdown/HTML
    tags: [{ type: String }], // e.g., ['React', 'Node.js', 'Docker']
    liveUrl: { type: String },
    githubUrl: { type: String },
    performanceMetrics: {
      lighthouseScore: Number,
      loadTime: String,
    },
    isPublished: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ["Fullstack", "Frontend", "Backend", "Mobile"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Project", projectSchema);
