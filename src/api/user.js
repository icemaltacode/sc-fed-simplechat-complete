import axios from "axios";

const API_KEY = process.env.REACT_APP_SIMPLECHAT_API_KEY;

const BASE_URL =
  "https://rcwwocnqq8.execute-api.eu-south-1.amazonaws.com/prod/user";

export async function registerUser(userName) {
  const config = {
    headers: {
      "x-api-key": API_KEY,
    },
    params: {
      userName: userName.value,
    },
  };

  const res = await axios
    .post(BASE_URL, null, config)
    .catch((err) => console.error(err));
  return res.data.senderId;
}
