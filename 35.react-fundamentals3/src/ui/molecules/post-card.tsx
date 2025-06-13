export const PostCard: React.FC<IPostView> = ({ user, title, body }) => {
  const { image, email, username } = user;

  return (
    <div className="bg-white border border-slate-600 shadow p-5 rounded-md space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img alt="avatar" src={image} className="w-full h-full" />
        </div>
        <div className="space-y-0.5">
          <p className="text-slate-700 text-sm font-semibold">{username}</p>
          <p className="text-slate-500 text-xs font-semibold">{email}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-slate-800 font-semibold">{title}</p>
        <p className="text-slate-500 text-sm font-medium">{body}</p>
      </div>
    </div>
  );
};
