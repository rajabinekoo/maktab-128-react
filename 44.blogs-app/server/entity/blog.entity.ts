import { randomUUID } from "node:crypto";

export class Blog {
  id!: string;
  name!: string;
  body!: string;
  thumbnail!: string;
  createdAt!: string;

  constructor(data: IAddBlog) {
    this.name = data.name;
    this.body = data.body;
    this.id = randomUUID();
    this.createdAt = new Date().toISOString();
  }
}
