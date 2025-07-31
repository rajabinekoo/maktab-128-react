import { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import { RootFilterQuery } from "mongoose";
import { MongoServerError } from "mongodb";

import { Res } from "../response";
import { BlogDocument, blogModel } from "../model/blog.model";
import {
  addBlogValidation,
  updateBlogValidation,
} from "@/libs/validations/blog";

class BlogService {
  public async getBlogsList(
    params: IGetListParams & { serverComponent?: boolean }
  ) {
    const search = params.search?.trim?.() || "";
    const skip = (params.page - 1) * params.limit;
    const filter: Array<RootFilterQuery<typeof blogModel>> = [];
    if (!!search) {
      filter.push({ name: { $regex: search, $options: "i" } });
      filter.push({ body: { $regex: search, $options: "i" } });
    }
    const list = await blogModel
      .find(!filter.length ? {} : { $or: filter })
      .skip(skip)
      .limit(params.limit);
    const count = await blogModel.countDocuments(filter);
    const result: IListRes<BlogDocument> = {
      list,
      count,
      page: params.page,
      limit: params.limit,
      pageCount: Math.ceil(count / params.limit),
    };
    if (params.serverComponent) return result;
    return Res(result);
  }

  public async addNewBlog(data: IAddBlog) {
    try {
      addBlogValidation.parse(data);
      const blog = await blogModel.create(data);
      return Res(blog, 201);
    } catch (error) {
      if (error instanceof ZodError) {
        return Res({ error: error.issues }, 400);
      }
      if (error instanceof MongoServerError && error.code === 11000) {
        return Res({ error: "Already exist" }, 409);
      }
      return Res({ error: "Something went wrong" }, 500);
    }
  }

  public async updateBlog(id: string, data: IUpdateBlog) {
    try {
      const blog = await blogModel.findById(id);
      if (!blog) return Res({ message: "Not found" }, 404);
      updateBlogValidation.parse(data);
      await blogModel.updateOne({ _id: blog._id }, data);
      return Res({ message: "Updated" });
    } catch (error) {
      if (error instanceof ZodError) {
        return Res({ error: error.issues }, 400);
      }
      if (error instanceof MongoServerError && error.code === 11000) {
        return Res({ error: "Already exist" }, 409);
      }
      return Res({ error: "Something went wrong" }, 500);
    }
  }

  public async deleteBlog(id: string) {
    const blog = await blogModel.findById(id);
    if (!blog) return Res({ message: "Not found" }, 404);
    await blogModel.deleteOne({ _id: blog._id });
    revalidateTag("fetch-blogs");
    return Res({ message: "Deleted" }, 200);
  }
}

export const blogService = new BlogService();
