import React from "react";
import { useState, useContext } from "react";
import UserContext from "../lib/UserContext";
import { uuid } from "../lib/utility";
import defaultDir from  "../data/schema.json"

import { getRandomColorWithOpacity } from "../lib/color";

function SignUp({ onCloseSignup, onSubmit, userStore, directoryStore }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setconfirmPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const _user = {
      uuid: uuid(),
      email: email,
      password: password,
    };
    setUser([...user, _user]);
    userStore.addUser(_user);
    const _directory = {
      ...defaultDir,
      email: email,
      uuid: uuid()
    }
    directoryStore.addRoot(_directory);
    alert(`${email} user has been created` );
    onCloseSignup();
  };

  return (
    <>
      <div
        id="authentication-modal"
        className="absolute flex z-50 max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
      >
        <div className=" max-h-full w-full max-w-md p-4">
          <div className="relative rounded-lg bg-bg-default shadow">
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
              <h3 className="text-xl font-semibold text-fg-muted dark:text-fg-default">
                Sign in to our platform
              </h3>
              <button
                type="button"
                onClick={onCloseSignup}
                className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-bg-overlay text-sm text-fg-default hover:text-fg-muted"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="h-3 w-3"
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
                    className="block w-full rounded-lg border p-2.5 text-sm bg-bg-default text-fg-default"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-fg-default"
                  >
                    Password{" "}
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border bg-bg-default p-2.5 text-sm text-fg-default bg-bg"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-fg-default"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border bg-bg-default p-2.5 text-sm text-fg-default"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </div>
                <div className="flex justify-between "></div>
                <button className="w-full rounded-lg  px-5 py-2.5 text-center text-sm font-medium bg-bg-doneEmphasis hover:bg-bg-accentEmphasis text-fg-default">
                  Create an account
                </button>
                <div className="text-sm font-medium text-fg-default">
                  {" "}
                  Already have account?{" "}
                  <a
                    href="#"
                    className="text-blue-700 hover:underline"
                  >
                    Login
                  </a>
                </div>
                <div className="" style={{ color: "red" }}>
                  {status}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
export { SignUp };
