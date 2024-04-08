import { useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

import { API_URL } from "../utils/constants";
import CommentContainer from "../features/comment/CommentContainer";
import ButtonUploadFile from "./ButtonUploadFile";
import { postComment } from "../api/comment";
import usePostComment from "../features/comment/usePostComment";
/*________________________________________________________________________________*/

const Comment = ({ comments, postId, user, photo }) => {
  const { postComment, isPostingComment } = usePostComment();
  const [text, setText] = useState("");
  const sharedImage = useRef();
  const [image, setImage] = useState();

  const sendComment = () => {
    let comment = new FormData();
    comment.append("content", text);
    if (image) comment.append("commentImg", image);
    postComment({ comment, postId });
  };

  return (
    <Container>
      <div className="input">
        <img src={`${API_URL}/images/${photo}`} alt="user" />
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          placeholder="Add a comment..."
        />
        <ButtonUploadFile
          image={image}
          setImage={setImage}
          sharedImage={sharedImage}
        >
          <button
            disabled={!text.trim()}
            className="comment"
            onClick={sendComment}
          >
            <FiSend className="text-3xl" />
          </button>
        </ButtonUploadFile>
      </div>
      <Uploads>
        {image && (
          <IoCloseSharp
            className="absolute right-6 top-4 z-50 cursor-pointer rounded-full border border-stone-700 text-4xl transition-all duration-200 hover:bg-slate-400"
            onClick={() => {
              setImage(null);
            }}
          />
        )}
        {image && <img src={URL.createObjectURL(image)} alt="" />}
      </Uploads>
      {comments.map((comment, id) => (
        <CommentContainer key={id} comment={comment} />
      ))}
    </Container>
  );
};
export default Comment;

const Container = styled.div`
  padding: 5px 16px 8px;
  .input {
    display: flex;
    align-items: center;
    padding-bottom: 10npm px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
`;
const Uploads = styled.div`
  text-align: center;
  overflow-y: scroll;
  max-height: 200px;
  margin-bottom: 15px;
  position: relative;
  img {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 98%;
  }
`;
