const Profile = ({ logoutUser, closeProfile}) => {

  return(
  <div className="fixed p-4 inset-0 z-50 flex items-start justify-end overflow-y-auto text-fg-default">
  <div className="max-w-md w-64 p-4 shadow rounded-lg ">
    <div className="flex items-center justify-between border-b">
      <h3 className="text-lg font-semibold">Profile</h3>
      <button type="button" className="inline-flex items-center justify-center rounded-lg hover:bg-bg-default text-sm p-2"
      onClick={closeProfile}>
        <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
    <div className="p-4">
      <button type="button" className="inline-flex items-center justify-center rounded-lg hover:bg-bg-overlay p-1"
      onClick={logoutUser}>
        Logout
      </button>
    </div>
  </div>
</div>
)
}

export default Profile;