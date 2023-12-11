const Sender = () => {
  return(
    <>
    <div id="authentication-modal" className="relative flex z-50 max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0">
        <div className=" max-h-full w-full max-w-md p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
              <h4 className="text-lg font-semibold text-gray-500 dark:text-white">Send request to connect</h4>
            </div>
            <div className="p-4 md:p-5">
                <div>
                  <label htmlFor="connectTo" className="mb-2 block text-sm font-medium text-gray-500 dark:text-white">Connect to</label>
                  < input
                    type="text"
                    id="connectTo"
                    className = "block w-full p-1 rounded-md border border-gray-300 bg-gray-50 text-sm text-gray-500 focus:outline-none  focus:border-purple-400 focus:ring-purple-400 dark:border-purple-400 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter SDP"
                    required
                  />
                </div>
                <button className="w-12 rounded-md px-2 py-1 my-1 bg-purple-400 text-center text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-0 focus:ring-purple-300 dark:bg-purple-400 dark:hover:bg-purple-600 dark:focus:ring-purple-600">send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sender;