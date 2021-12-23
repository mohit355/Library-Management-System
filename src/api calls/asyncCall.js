import axios from "../config";

export const isUserValid = async (user) => {
  const filterQuery =
    "AND({username}=" +
    `'${user.userName}'` +
    ",{password}=" +
    `'${user.password}'` +
    ")";

  return await axios.get(`/user?filterByFormula=${filterQuery}`, {
    headers: {
      Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
    },
  });
};

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

export const getCatalogue = async () => {
  return await axios.get(`/library`, {
    headers: {
      Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
    },
  });
};

// export const isUserValid = (user) => {
//   const filterQuery =
//     "AND({username}=" +
//     `'${user.userName}'` +
//     ",{password}=" +
//     `'${user.password}'` +
//     ")";

//   base("user")
//     .select({
//       maxRecords: 1,
//       filterByFormula: filterQuery,
//     })
//     .eachPage(
//       (records, fetchNextPage) => {
//         console.log(records);
//         return records.length;
//       },
//       (err) => {
//         if (err) {
//           return err;
//         }
//       }
//     );
// };

// https://api.airtable.com/v0/appqxnivm1TkaCVrV/user?filterByFormula=AND({username}="js",   {password}="admin")
