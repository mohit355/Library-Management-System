import axios from "../config";

export const createUser = async (user) => {
  const newUser = [
    {
      fields: {
        username: user.userName,
        password: user.password,
      },
    },
  ];

  return await axios.post(`/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
    },
    data: newUser,
  });
};
