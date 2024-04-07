import axios from "axios";
import { API_URL } from "../utils/constants";

export async function searchPosts(name) {
  try {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const data = await axios.get(`${API_URL}/post/search?name=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!data) return null;
    const result = await data.data;
    return result;
  } catch (error) {
    throw new Error("Search failed");
  }
}

export async function getPosts() {
  try {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const data = await axios.get(`${API_URL}/post/get/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!data) return null;
    const result = await data.data;
    return result;
  } catch (error) {
    throw new Error("Posts not found");
  }
}

export async function createPost(post) {
  try {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const data = await axios.post(`${API_URL}/post/new`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await data.data;
    return result;
  } catch (error) {
    throw new Error("Create post failed");
  }
}

export async function deletePost(postId) {
  try {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const data = await axios.delete(`${API_URL}/post/delete/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await data.data;
    return result;
  } catch (error) {
    throw new Error("Delete post failed");
  }
}
