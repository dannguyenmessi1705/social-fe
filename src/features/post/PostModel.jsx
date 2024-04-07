import { useState, useRef } from "react";
import styled from "styled-components";

import useUploadPost from "./useUploadPost";

import { SlPicture } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";
import useUser from "../authentication/useUser";
import { API_URL } from "../../utils/constants";
import Spinner from "../../ui/Spinner";

const PostModel = ({ close, addPost }) => {
  const { uploadPost, isUploadingPost } = useUploadPost();
  const { user, isLoading } = useUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const sharedImage = useRef();
  const [image, setImage] = useState();

  const reset = () => {
    setTitle("");
    setBody("");
    setImage();
  };

  const postArticleHandler = () => {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (image) formData.append("postImg", image);
    uploadPost(formData);
    reset();
    close();
  };

  if (isUploadingPost) return <Spinner />;

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <Content>
          <Header>
            <h2>Create a post</h2>
            <IoCloseSharp
              className="cursor-pointer rounded-full border p-1 text-3xl hover:bg-slate-400"
              onClick={() => {
                reset();
                close();
              }}
            />
          </Header>

          <SharedContent>
            <UserInfo>
              <img src={`${API_URL}/images/${user?.avatar}`} alt="user" />
              <span>{user?.fullName}</span>
            </UserInfo>

            <Description>
              <input
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                autoFocus={true}
                placeholder="Title post"
              ></input>
            </Description>

            <Description>
              <textarea
                value={body}
                onChange={(e) => setBody(e.currentTarget.value)}
                autoFocus={true}
                placeholder="What do you want to talk about?"
              ></textarea>
            </Description>

            <Uploads>
              {image && (
                <IoCloseSharp
                  className="cursor-pointer rounded-full border p-1 text-3xl hover:bg-slate-400"
                  onClick={() => {
                    setImage(null);
                  }}
                />
              )}
            </Uploads>

            <Actions>
              <div className="editor">
                <button
                  disabled={image}
                  onClick={() => sharedImage.current.click()}
                  className="rounded-full px-2 py-1 hover:bg-slate-400"
                >
                  <SlPicture className="text-3xl" />
                  <input
                    ref={sharedImage}
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    name="postImg"
                    hidden
                  />
                </button>
              </div>

              <button
                disabled={!body.trim() || !title.trim() || isUploadingPost}
                className="post"
                onClick={postArticleHandler}
              >
                Post
              </button>
            </Actions>
          </SharedContent>
        </Content>
      )}
    </Container>
  );
};
export default PostModel;

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.75);
  animation: fadeIn 0.3s;
`;
const Content = styled.article`
  max-width: 552px;
  max-height: 90%;
  background-color: white;
  border-radius: 5px;
  position: relative;
  top: 32px;
  margin: 0 auto;
  animation: up 0.5s ease-out;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

  h2 {
    font-weight: 600;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.8);
  }
  button {
    width: 40px;
    height: 40px;
    background-color: white;
    cursor: pointer;
    border: 0;
    border-radius: 50%;
    transition: 0.2s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  vertical-align: baseline;
  background-color: transparent;
  padding: 8px 20px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    margin-left: 5px;
  }
`;
const Description = styled.div`
  padding: 12px 0;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: 0;
    outline: 0;
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  input {
    width: 100%;
    min-height: 20px;
    resize: none;
    border: 0;
    outline: 0;
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
`;
const Uploads = styled.div`
  text-align: center;
  overflow-y: scroll;
  max-height: 200px;
  margin-bottom: 15px;
  position: relative;
  img:first-child {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 24px;
    padding: 8px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    z-index: 100;
    transition: 0.2s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.9);
    }
  }
  img:last-child {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 98%;
  }
`;
/*_________________________________________*/
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    &:disabled {
      background-color: rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.3);
      cursor: not-allowed;
    }
  }
  .editor {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-left: -6px;
    .addButtons {
      button {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        &:disabled {
          filter: contrast(0);
          background-color: transparent;
        }
      }
    }
    .shareComment {
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      padding-left: 5px;
      margin-left: 10px;
      font-size: 14px;
      button {
        display: flex;
        align-items: center;
        border-radius: 16px;
        color: #666666;
        font-weight: 600;
        padding: 8px 14px;
        img {
          width: 18px;
          margin-right: 4px;
        }
      }
    }
  }
  .post {
    background-color: #0a66c2;
    font-size: 16px;
    color: white;
    padding: 6px 16px;
    cursor: pointer;
    height: fit-content;
    border-radius: 25px;
    transition: 0.3s;
    font-weight: 600;
    &:hover {
      background-color: #004182;
      &:disabled {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;
