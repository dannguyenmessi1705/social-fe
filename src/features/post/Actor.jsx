import styled from "styled-components";
import useUserDetail from "../user/useUserDetail";

import { SlOptionsVertical } from "react-icons/sl";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";
import { API_URL } from "../../utils/constants";

const StlyedActor = styled.div`
  padding-right: 40px;
  padding: 12px 16px 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  align-items: flex-start;
  position: relative;
  a {
    overflow: hidden;
    display: flex;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .info {
      text-align: start;
      h6 {
        font-size: 14px;
        color: rgba(0, 0, 0, 1);
        font-weight: 600;
      }
      span {
        font-size: 12px;
        display: block;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const EditModel = styled.ul`
  animation: fadeIn 0.5s;
  text-align: start;
  position: absolute;
  right: 5px;
  top: 55px;
  background-color: white;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 15%),
    0 6px 9px rgb(0 0 0 / 20%);
  border-radius: 8px;
  overflow: hidden;
  z-index: 99;
  min-width: 250px;
  li {
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    img {
      width: 18px;
      height: 20px;
    }
    h6 {
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
      font-weight: 600;
    }
    .info {
      text-align: start;
      span {
        font-size: 12px;
        display: block;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;

function Actor({ post, setShowEditPost, showEditPost, user }) {
  const { userDetail } = useUserDetail(post.userCreatedPost);
  return (
    <StlyedActor>
      <a href="/feed">
        <img
          src={
            `${API_URL}/images/${userDetail?.avtUrl}` ?? `/images/anonymous.png`
          }
          alt="user"
        />
        <div className="info">
          <h6 className="name">{userDetail?.fullName}</h6>
          <span className="title">{userDetail?.email}</span>
          <span className="date">{post.postedAt}</span>
        </div>
      </a>
      <button
        onClick={() =>
          setShowEditPost((prev) => (prev === post.postId ? null : post.postId))
        }
      >
        <SlOptionsVertical />
      </button>
      {showEditPost === post.postId && (
        <EditModel>
          {userDetail?.userId !== user.userId && (
            <li>
              <PiWarningFill />
              <div>
                <h6>Report user</h6>
              </div>
            </li>
          )}
          {post.userCreatedPost === user.userId && (
            <>
              <li
              //onClick={() => deletePost(postID)}
              >
                <FaEdit />
                <h6>Edit post</h6>
              </li>
              <li
              //onClick={() => deletePost(postID)}
              >
                <FaTrash />
                <h6>Delete post</h6>
              </li>
            </>
          )}
        </EditModel>
      )}
    </StlyedActor>
  );
}

export default Actor;
