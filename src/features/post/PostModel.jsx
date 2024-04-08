import { useState, useRef } from "react";
import styled from "styled-components";

import { SlPicture } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";

import { API_URL } from "../../utils/constants";
import ButtonUploadFile from "../../ui/ButtonUploadFile";

const PostModel = ({ close, user, uploadPost }) => {
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

  return (
    <Container>
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
                className="absolute right-6 top-4 z-50 cursor-pointer rounded-full border border-stone-700 text-4xl transition-all duration-200 hover:bg-slate-400"
                onClick={() => {
                  setImage(null);
                }}
              />
            )}
            {image && <img src={URL.createObjectURL(image)} alt="" />}
          </Uploads>

          <ButtonUploadFile
            image={image}
            setImage={setImage}
            sharedImage={sharedImage}
          >
            <button
              disabled={!body.trim() || !title.trim()}
              className="post"
              onClick={postArticleHandler}
            >
              Post
            </button>
          </ButtonUploadFile>
        </SharedContent>
      </Content>
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
  img {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 98%;
  }
`;
