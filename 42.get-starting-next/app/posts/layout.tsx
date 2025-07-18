const PostsLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <main className="mx-auto container max-w-[600px] w-full my-10">
      {children}
    </main>
  );
};

export default PostsLayout;
