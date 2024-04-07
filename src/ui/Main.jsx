import { useCallback, useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

import styled from "styled-components";
import Actor from "../features/post/Actor";
import PostModel from "../features/post/PostModel";
import Comment from "./Comment";
import Spinner from "./Spinner";
import useUser from "../features/authentication/useUser";
import useGetAllPost from "../features/post/useGetAllPost";

import { API_URL } from "../utils/constants";

/*________________________________________________________________________________*/

const Main = () => {
  const { user, isLoading } = useUser();
  const { posts, isLoadingPosts } = useGetAllPost();
  const [posts1, setPosts1] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showComments, setShowComments] = useState([]);
  const [showEditPost, setShowEditPost] = useState(false);
  const [load, setLoad] = useState("");

  if (isLoadingPosts) return <Spinner />;

  const hideModel = () => {
    setShowModel(false);
  };

  //   const uploadPost = useCallback(
  // (post) => {
  //   // Upload File.
  //   const storageRef = ref(
  //     storage,
  //     post.image ? `images/${post.image.name}` : `vedios/${post.vedio.name}`
  //   );
  //   const upload = uploadBytesResumable(
  //     storageRef,
  //     post.image ? post.image : post.vedio
  //   );

  //       // Listen for state changes, errors, and completion.
  //       upload.on(
  //         "state_changed",
  //         (snapshot) => {
  //           console.log(snapshot);
  //           const progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           setLoad(progress);
  //           if (snapshot.state === "RUNNING") {
  //             setLoad(progress);
  //           }
  //         },
  //         (error) => {
  //           console.log(error.code);
  //         },
  //         async () => {
  //           const url = await getDownloadURL(upload.snapshot.ref);
  //           // Add to DataBase
  //           await addDoc(collection(db, "Articles"), {
  //             user: {
  //               name: user.displayName,
  //               title: user.email,
  //               photo: user.photoURL,
  //             },
  //             date: Timestamp.now(),
  //             sharedImage: post.image ? url : "",
  //             sharedVedio: post.vedio ? url : "",
  //             description: post.text,
  //             comments: [],
  //             likes: [],
  //           });
  //           setLoad();
  //         }
  //       );
  //     },
  //     [user]
  //   );

  //   useEffect(() => {
  //     const getPosts = async () => {
  //       const q = await query(
  //         collection(db, "Articles"),
  //         orderBy("date", "desc")
  //       );
  //       onSnapshot(q, (querySnapshot) => {
  //         let arr = [];
  //         querySnapshot.forEach((doc) => {
  //           arr.push({ post: doc.data(), postID: doc.id });
  //         });

  //         setPosts1(arr);
  //       });
  //     };
  //     getPosts();
  //   }, [uploadPost]);

  //   // Implent Like and unLike
  //   const fetchLikes = (postId, likes) => {
  //     updateDoc(doc(db, "Articles", postId), {
  //       likes: likes.some((l) => l.email === user.email)
  //         ? likes.filter((l) => l.email !== user.email)
  //         : [
  //             { name: user.displayName, email: user.email, photo: user.photoURL },
  //             ...likes,
  //           ],
  //     });
  //   };

  //   // Delete Post
  //   const deletePost = (postID) => {
  //     deleteDoc(doc(db, "Articles", postID));
  //   };

  return (
    <div>
      <ShareBox>
        <div>
          <img src={`${API_URL}/images/${user?.avatar}`} alt="user" />
          <button onClick={() => setShowModel(true)}>Start a post</button>
        </div>
      </ShareBox>

      {load && (
        <UploadingBox>
          <img src="/Images/vedio.svg" alt="vedio" />
          <div className="info">
            <span>Uploading...</span>
            <div className="progress">
              <span>0</span>
              <div className="bar">
                <span style={{ width: load + "%" }} width={"50%"}></span>
              </div>
              <span>100</span>
            </div>
          </div>
          <img src="/Images/ellipsis.svg" alt="ellipsis" />
        </UploadingBox>
      )}

      {posts.length > 0 &&
        posts.map((post) => (
          <Article key={post.postId}>
            <Actor
              post={post}
              setShowEditPost={setShowEditPost}
              showEditPost={showEditPost}
            />
            <Description>{post?.title}</Description>
            <SocialContents>
              <li>
                {post.likesQuantity > 0 && (
                  <img
                    src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                    alt="likes"
                  />
                )}
                <span>{post.likesQuantity}</span>
              </li>
              <li>
                <p>{post?.commentsQuantity} comments </p>
              </li>
            </SocialContents>
            <SocialActions>
              <button
              // className={
              //   post.likes.some((l) => l.email === user.email) ? "active" : ""
              // }
              // onClick={(e) => {
              //   fetchLikes(postID, post.likes);
              // }}
              >
                <AiOutlineLike />
                <AiFillLike className="text-blue-600" />

                <span className="text-blue-600">Like</span>
              </button>

              <button
              //onClick={() => setShowComments((prev) => [...prev, id])}
              >
                <FaRegComment />
                <span>Comment</span>
              </button>
            </SocialActions>
            {/* {showComments.includes(id) && (
              <Comment
                // photo={user?.photoURL}
                // comments={post.comments}
                // user={user}
                postID={postID}
              />
            )} */}
          </Article>
        ))}
      {showModel && (
        <PostModel
          close={hideModel}
          addPost={setPosts1}
          //   uploadPost={uploadPost}
        />
      )}
    </div>
  );
};
export default Main;

const CommonCard = styled.article`
  overflow: hidden;
  text-align: center;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 5px;
  border: none;
  position: relative;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 15%),
    0 0 0 rgb(0 0 0 / 20%);
`;
/*_________________________________________*/
const UploadingBox = styled(CommonCard)`
  text-align: start;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  color: rgba(0, 0, 0, 0.7);
  position: relative;
  & > img {
    width: fit-content;
  }
  .progress {
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 400px;
    .bar {
      width: 100%;
      height: 8px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.08);
      overflow: hidden;
      position: relative;
      span {
        position: absolute;
        height: 100%;
        background-color: #576779;
      }
    }
    @media (max-width: 768px) {
      width: 230px;
    }
  }
`;
/*_________________________________________*/
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background-color: white;

  div {
    button {
      color: rgba(0, 0, 0, 0.6);
      outline: none;
      border: none;
      background-color: transparent;
      min-height: 48px;
      line-height: 1.5;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      transition: 0.2s;
      padding: 8px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
      }
    }

    &:last-child {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding-bottom: 4px;
      button {
        border-radius: 5px;
        img {
          margin: 0 10px 0 -2px;
        }
      }
    }
  }
`;
/*_________________________________________*/
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const Description = styled.div`
  font-size: 14px;
  text-align: start;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.9);
  overflow: hidden;
`;
/*_________________________________________*/
const SharedImg = styled.div`
  width: 100%;
  max-height: 500px;
  position: relative;
  background-color: #f9fafb;
  margin-top: 8px;
  overflow: hidden;
  img {
    max-height: 500px;
    max-width: 100%;
  }
`;
/*_________________________________________*/
const SocialContents = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0 16px;
  padding: 8px 0;
  overflow: auto;
  border-bottom: 1px solid #e9e5df;
  font-size: 12px;
  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      margin-right: -5px;
      background-color: white;
      border-radius: 50%;
    }
    span {
      margin-left: 8px;
    }
    &:hover {
      color: #0a66c2;
      text-decoration: underline;
    }
  }
`;
/*_________________________________________*/
const SocialActions = styled.div`
  padding: 0 16px;
  display: grid;
  grid-template-columns: auto auto;
  min-height: 40px;
  overflow: hidden;
  button {
    outline: 0;
    color: rgba(0, 0, 0, 0.6);
    padding: 12px 24px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 5px;
    border: 0;
    border-radius: 5px;
    transition: 0.2s;
    font-weight: 600;
    .liked {
      display: none;
    }
    .unLiked {
      display: inline-block;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    &.active {
      color: #0a66c2;
      .liked {
        display: inline-block;
      }
      .unLiked {
        display: none;
      }
    }
    @media (max-width: 767px) {
      flex-direction: column;
      padding: 10px;
      margin: 0;
      font-size: 12px;
    }
  }
`;
/*________________________________________________________________________________*/
