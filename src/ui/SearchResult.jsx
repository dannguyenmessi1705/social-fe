import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constants";
import UserItem from "./UserItem";
import PostItem from "./PostItem";

/*________________________________________________________________________________*/

const SearchResult = ({ users, posts, isSearchingUser, isSearchingPost }) => {
  if (!users?.length && !posts?.length && !isSearchingPost && !isSearchingUser)
    return (
      <Container className="container">
        <p className="text-center font-semibold">No results found</p>
      </Container>
    );
  return (
    <Container className="container">
      <ul className="flex flex-col gap-4">
        {users &&
          users.map((user) => <UserItem key={user.userId} user={user} />)}
        {posts &&
          posts.map((post) => <PostItem key={post.postId} post={post} />)}
      </ul>
    </Container>
  );
};
export default SearchResult;

/*________________________________________________________________________________*/

const Container = styled.article`
  position: absolute;
  top: 60px;
  width: 80%;
  height: 300px;
  padding: 24px;
  background-color: white;
  animation: fadeIn 0.3s;
  border-radius: 10px;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 15%),
    0 6px 9px rgb(0 0 0 / 20%);
  overflow-y: scroll;
`;
