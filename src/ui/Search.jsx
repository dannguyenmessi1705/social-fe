import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/user";
import { searchPosts } from "../api/post";

import SearchResult from "./SearchResult";

const StyledSearch = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
      @media (max-width: 767px) {
        width: 205px;
      }
    }
  }
  @media (max-width: 365px) {
    margin-left: 25px;
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Search() {
  const [name, setName] = useState('');
  const { data: users, isLoading: isSearchingUser } = useQuery({
    queryKey: ["searchUsers", name],
    queryFn: () => searchUsers(name),
  });
  const { data: posts, isLoading: isSearchingPost } = useQuery({
    queryKey: ["searchPosts", name],
    queryFn: () => searchPosts(name),
  });
  return (
    <>
      <StyledSearch>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <SearchIcon>
          <FaSearch className="opacity-50" />
        </SearchIcon>
        {name && (
          <SearchResult
            users={users?.data}
            posts={posts?.data}
            isSearchingUser={isSearchingUser}
            isSearchingPost={isSearchingPost}
          />
        )}
      </StyledSearch>
    </>
  );
}

export default Search;
