import { useState, useRef } from "react";
import styled from "styled-components";

import { SlPicture } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";
import { API_URL } from "../../utils/constants";
import Spinner from "../../ui/Spinner";
import usePostUpdate from "./usePostUpdate";

const PostUpdate = ({ close, user, post }) => {
  const { updatePost, isUpdatingPost } = usePostUpdate();
  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const sharedImage = useRef();
  const [image, setImage] = useState(post?.postImg);

  const reset = () => {
    setTitle("");
    setBody("");
    setImage(null);
  };

  const postUpdate = () => {
    const postId = post.postId;
    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (image instanceof File) formData.append("postImg", image);
    else if (image == null) formData.append("postImg", null);
    updatePost({ post: formData, postId });
    reset();
    close();
  };

  return (
    <Container>
      {isUpdatingPost ? (
        <Spinner />
      ) : (
        <Content>
          <Header>
            <h2>Create a post</h2>
            <IoCloseSharp
              className="cursor-pointer rounded-full border p-1 text-3xl hover:bg-slate-400"
              onClick={() => {
                reset();
                close(false);
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
                placeholder="Title post"
              ></input>
            </Description>

            <Description>
              <textarea
                value={body}
                onChange={(e) => setBody(e.currentTarget.value)}
                placeholder="What do you want to talk about?"
              ></textarea>
            </Description>

            <Uploads>
              {image && (
                <IoCloseSharp
                  className="absolute right-6 top-4 z-50 cursor-pointer rounded-full border border-stone-700 text-4xl transition-all duration-200 hover:bg-slate-400"
                  onClick={() => {
                    setImage(null);
                  }}
                />
              )}
              {image && image instanceof File ? (
                <img src={URL.createObjectURL(image)} alt="" />
              ) : (
                <img src={`${API_URL}/images/${image}`} alt="" />
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
                disabled={!body.trim() || !title.trim() || isUpdatingPost}
                className="post"
                onClick={postUpdate}
              >
                Update
              </button>
            </Actions>
          </SharedContent>
        </Content>
      )}
    </Container>
  );
};
export default PostUpdate;

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
  img {
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
