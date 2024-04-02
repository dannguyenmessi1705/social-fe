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