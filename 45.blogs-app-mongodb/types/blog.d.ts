interface IBlog {
  _id: string;
  name: string;
  body: string;
  thumbnail: string;
  createdAt: string;
}

interface IAddBlog {
  name: string;
  body: string;
}

interface IUpdateBlog {
  name?: string;
  body?: string;
}
