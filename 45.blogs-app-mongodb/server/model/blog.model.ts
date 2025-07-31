import mongoose, { HydratedDocument } from "mongoose";

const blogSchema = new mongoose.Schema<IBlog>({
  body: String,
  thumbnail: String,
  createdAt: String,
  name: { type: String, unique: true },
});

export const blogModel = mongoose.model("blogs", blogSchema);

export type BlogDocument = HydratedDocument<IBlog>;
