import React from "react";
import {
  useState
} from "react";


function SignUp({onSignUpOpen, onSubmit}) {
  
 const [formData, setFormData] = useState({
   email: '',
   password: '',
   confirmPassword: '',
   color: ''
 });

 const handleInputChange = (event) => {
   const {
     name,
     value
   } = event.target;
   setFormData((prevData) => ({
     ...prevData,
     [name]: value,
   }));
 };

 const handleSubmit = (event) => {
   event.preventDefault();
   // Do something with formData, like sending it to an API or validating
    onSubmit(formData);
 };
  
  return (
    <>
      <div id="authentication-modal" className="relative flex z-50 max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0">
        <div className=" max-h-full w-full max-w-md p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sign in to our platform</h3>
              <button type="button" onClick={onSignUpOpen} className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              < form className = "space-y-4"
              onSubmit = {
                handleSubmit
              } >
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  < input 
                  type = "email"
                  name = "email"
                  id = "email"
                  className = "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder = "name@domain.com"
                 value = {
                   formData.email
                 }
                 onChange = {
                   handleInputChange
                 }
                  required 
                  / >
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  < input type = "password"
                  name = "password"
                  id = "password"
                  placeholder = "••••••••"
                  className = "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  value = {
                    formData.password
                  }
                  onChange = {
                    handleInputChange
                  }
                  required / >
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  < input type = "password"
                  name = "confirmPassword"
                  id = "confirmPassword"
                  placeholder = "••••••••"
                  className = "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  value = {
                    formData.confirmPassword
                  }
                  onChange = {
                    handleInputChange
                  }
                  required / >
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input id="remember" type="checkbox" value="" className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <button className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">Already have account? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Login</a></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;
export { SignUp };