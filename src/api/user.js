import axios from "axios";
import { API_URL } from "../utils/constants";
export async function getCurrentUser(userId) {
  try {
    const data = await axios.get(`${API_URL}/user/${userId}`);
    if (!data) throw new Error("User not found");
    const result = await data.data;
    return result;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function searchUsers(name) {
  try {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const data = await axios.get(`${API_URL}/user/search?name=${name}`, {
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
