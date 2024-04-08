import axios from "axios";
import { API_URL } from "../utils/constants";

export async function postComment(comment, postId) {
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  try {
    const data = await axios.post(
      `${API_URL}/comment/post/${postId}`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await data.data;
    return result;
  } catch (error) {
    throw new Error("Comment failed!");
  }
}
