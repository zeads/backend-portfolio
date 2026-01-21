import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // Jika null, berarti "Present"
    isCurrentRole: { type: Boolean, default: false },
    description: [{ type: String }], // Poin-poin pencapaian
    techStack: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.model("Experience", experienceSchema);
