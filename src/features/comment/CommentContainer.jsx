import { styled } from "styled-components";
import { SlOptionsVertical } from "react-icons/sl";

import useUserDetail from "../user/useUserDetail";
import { API_URL } from "../../utils/constants";

const StlyedCommentContainer = styled.div`
  display: flex;
  padding-top: 15px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .content {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background-color: #f2f2f2;
    .header {
      display: flex;
      justify-content: space-between;
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
      img {
        width: 1rem;
        height: fit-content;
      }
    }
    p {
      padding-top: 10px;
      text-align: start;
    }
  }
`;

function CommentContainer({ comment }) {
  const { userDetail } = useUserDetail(comment.userComments);
  return (
    <StlyedCommentContainer>
      <img src={`${API_URL}/images/${userDetail?.avtUrl}`} alt="user" />
      <div className="content">
        <div className="header">
          <div className="info">
            <h6>{userDetail?.fullName}</h6>
            <span>{userDetail?.email}</span>
          </div>
          <SlOptionsVertical />
        </div>
        <p>{comment.content}</p>
      </div>
    </StlyedCommentContainer>
  );
}

export default CommentContainer;
