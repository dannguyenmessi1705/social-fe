import { API_URL } from "../utils/constants";

import axios from "axios";

export async function signin(email, password) {
  try {
    const data = await axios.post(
      `${API_URL}/auth/signin?email=${email}&password=${password}`,
    );
    if (!data) throw new Error("Login failed");
    const result = await data.data;
    return result;
  } catch (error) {
    throw new Error("Login failed");
  }
}

export async function getCurrentUser() {
  const data = localStorage.getItem("user");
  if (!data) throw new Error("User not found");
  return JSON.parse(data);
}

export async function signup(formData) {
  try {
    const data = await axios.post(`${API_URL}/auth/signup`, formData);
    if (!data) throw new Error("Signup failed");
    const result = await data.data;
    return result;
  } catch (error) {
    throw new Error("Signup failed");
  }
}
