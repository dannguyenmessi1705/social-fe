import { API_URL } from "../utils/constants";

import axios from "axios";

export async function signin(email, password) {
  const data = await axios.post(
    `${API_URL}/auth/signin?email=${email}&password=${password}`,
  );
  const result = await data.data;
  return result;
}
