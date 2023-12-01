import logo from "./logo.svg"
export default function Navbar({onToggleLeftSidebar,onSignUpOpen}) {
  return (
    <div className="flex flex-row w-full justify-between border-b items-center transition duration-700 ease-in-out" >
      <div className="flex flex-row" id="left">
        <div className="p-2 hover:bg-slate-200 cursor-pointer rounded-sm" onClick={onToggleLeftSidebar}>
          <svg  className="fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </div>
        <div className="pl-6">
          <img src={logo} height={75} width={30}></img>
        </div>
        <div className="pl-4">Edito</div>
      </div>
      <div className="">Navigation</div>
        <div></div>
      <div className="flex flex-row">
        <div className="">
          <button onClick={onSignUpOpen} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">SignUp</button>
        </div>
        <div className="pl-2 pr-2">
          <button className="text-white bg-transparent bg-blue-500 font-semibold py-1 px-4 border border-blue-500 hover:border-transparent rounded">Login</button>
        </div>
      </div>
    </div>
  )
}