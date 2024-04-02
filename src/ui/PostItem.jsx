import { Link } from "react-router-dom";
function PostItem({ post }) {
  return (
    <Link className="px-3 py-4 hover:bg-slate-400" to={`post/${post.postId}`}>
      <p className="font-semibold">
        {post.title.length > 100
          ? post.title.slice(0, 100) + "..."
          : post.title}
      </p>
    </Link>
  );
}

export default PostItem;
