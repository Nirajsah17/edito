import { useState, useContext } from "react";
import { findByEmail } from "../lib/utility";
import UserContext from "../lib/UserContext";

function Login({ onLoginOpen, onCloseLogin, onLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const passwordHandler = (e) => {
    const password = e.target.value;
    setpassword(password);
  };

  const emailHandler = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObj = findByEmail(user,email);
    if(!userObj) {
      alert("user not Found") ;
      return;
    };
    if(userObj.password != password) {
      alert("Invalid password");
      return;
    }
    alert("Successfully logged in");
    onCloseLogin();
    onLogin(email);
    localStorage.setItem("user", email);
  };
  
  return (
    <>
      <div
        id="authentication-modal"
        className="absolute flex z-50 max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 bg-bg"
      >
        <div className=" max-h-full w-full max-w-md p-4">
          <div className="relative rounded-lg shadow bg-bg-default">
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
              <h3 className="text-xl font-semibold text-fg-default">
                Login in to our platform
              </h3>
              <button
                type="button"
                onClick={onCloseLogin}
                className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm hover:bg-bg-overlay"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="h-3 w-3 text-fg-default"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-fg-default"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border p-2.5 text-sm text-fg-default bg-bg-default"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={emailHandler}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-fg-default"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border  p-2.5 text-sm text-fg-default bg-bg-default"
                    value={password}
                    onChange={passwordHandler}
                    required
                  />
                </div>
                <div className="flex justify-between"></div>
                <button className="w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium bg-bg-doneEmphasis hover:bg-bg-accentEmphasis">
                  Login
                </button>
                <div className="text-sm font-medium text-fg-default">
                  Don't have account ?{" "}
                  <a
                    href="#"
                    className="text-blue-700 hover:underline"
                  >
                    SignUp
                  </a>
                </div>
                <div style={{ color: "red" }}>{error}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
export { Login };
