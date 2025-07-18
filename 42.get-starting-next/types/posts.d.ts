interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  views: number;
  userId: number;
}

interface IPostsList extends IList {
  posts: Array<IPost>;
}
