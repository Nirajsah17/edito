import { createContext } from "react";

const UserContext = createContext({
  users: [
    {
      uuid: "1234",
      email: "dummy@gmail.com",
      password: "12345",
    },
    {
      uuid: "123487",
      email: "dummy@gmail2.com",
      password: "12345s",
    },
  ],
});

export default UserContext;