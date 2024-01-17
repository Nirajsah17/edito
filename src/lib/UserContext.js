import {createContext} from "react"

const UserContext = createContext({
  users: {
    email: "dummy@gmail.com",
    password: "12345"
  }
});

export default UserContext;