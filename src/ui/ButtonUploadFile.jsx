import { styled } from "styled-components";
import { SlPicture } from "react-icons/sl";

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

function ButtonUploadFile({
  sharedImage,
  setImage,
  image,
  children,
}) {
  return (
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
            hidden
          />
        </button>
      </div>
      {children}
    </Actions>
  );
}

export default ButtonUploadFile;
