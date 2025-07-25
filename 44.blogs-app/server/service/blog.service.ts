import { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import { writeFile, access, readFile } from "node:fs/promises";

import { Res } from "../response";
import { Blog } from "../entity/blog.entity";
import {
  addBlogValidation,
  updateBlogValidation,
} from "@/libs/validations/blog";

class BlogService {
  private readonly blogsList: Array<Blog> = [];
  private readonly filePath = "/tmp/blogs.json";
  private initialized = false;

  public async init() {
    if (this.initialized) return;
    try {
      await access(this.filePath);
      const json = await readFile(this.filePath, { encoding: "utf-8" });
      this.blogsList.push(...JSON.parse(json));
    } catch (error) {
      await writeFile(this.filePath, "[]", { encoding: "utf-8" });
    }
    this.initialized = true;
  }

  private async changeFile() {
    await writeFile(this.filePath, JSON.stringify(this.blogsList), {
      encoding: "utf-8",
    });
  }

  private getBlogIndexById(id: string) {
    return this.blogsList.findIndex((el) => el.id === id);
  }

  public async getBlogsList(
    params: IGetListParams & { serverComponent?: boolean }
  ) {
    await this.init();
    const end = params.page * params.limit;
    const start = end - params.limit;
    const search = params.search?.trim?.() || "";
    let blogsList = [...this.blogsList];
    if (!!search) {
      blogsList = blogsList.filter((el) => {
        return el.name.includes(search) || el.body.includes(search);
      });
    }
    const result: IListRes<Blog> = {
      page: params.page,
      limit: params.limit,
      count: blogsList.length,
      pageCount: Math.ceil(blogsList.length / params.limit),
      list: blogsList.slice(start, end),
    };
    if (params.serverComponent) return result;
    return Res(result);
  }

  public async addNewBlog(data: IAddBlog) {
    await this.init();
    try {
      addBlogValidation.parse(data);
      const duplicateItem = this.blogsList.find(
        (el) => el.name.toLowerCase() === data.name.toLowerCase()
      );
      if (!!duplicateItem) return Res({ error: "Already exist" }, 409);
      this.blogsList.push(new Blog(data));
      await this.changeFile();
      return Res({ message: "Created" }, 201);
    } catch (error) {
      if (error instanceof ZodError) {
        return Res({ error: error.issues }, 400);
      }
      return Res({ error: "Something went wrong" }, 500);
    }
  }

  public async updateBlog(id: string, data: IUpdateBlog) {
    await this.init();
    try {
      const index = this.getBlogIndexById(id);
      if (index === -1) return Res({ message: "Not found" }, 404);
      const blog = this.blogsList[index];
      updateBlogValidation.parse(data);
      if (!!data.name) {
        const target = this.blogsList.find(
          (el) =>
            el.name.toLowerCase() === data.name?.toLowerCase() && id !== el.id
        );
        if (!!target) return Res({ error: "Already exist" }, 409);
      }
      this.blogsList.splice(index, 1, { ...blog, ...data });
      await this.changeFile();
      return Res({ message: "Updated" });
    } catch (error) {
      if (error instanceof ZodError) {
        return Res({ error: error.issues }, 400);
      }
      return Res({ error: "Something went wrong" }, 500);
    }
  }

  public async deleteBlog(id: string) {
    await this.init();
    const index = this.getBlogIndexById(id);
    if (index === -1) return Res({ message: "Not found" }, 404);
    this.blogsList.splice(index, 1);
    await this.changeFile();
    revalidateTag("fetch-blogs");
    return Res({ message: "Deleted" }, 200);
  }
}

export const blogService = new BlogService();
