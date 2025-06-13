interface IPost {
  id: number;
  body: string;
  title: string;
  views: number;
  userId: number;
  tags: Array<string>;
  reactions: { likes: number; dislikes: number };
}

interface IPostsList extends IList {
  posts: Array<IPost>;
}

interface IPostView extends IPost {
  user: IUser;
}
