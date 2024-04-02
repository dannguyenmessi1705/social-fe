import { Link } from "react-router-dom";
function UserItem({ user }) {
  return (
    <Link className="px-3 py-4 hover:bg-slate-400" to={`/user/${user.userId}`}>
      <p className="font-semibold">{user.fullName}</p>
      <p className="text-sm">{user.email}</p>
    </Link>
  );
}

export default UserItem;
