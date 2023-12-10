const File = ({ name }) => (
  <div className=" p-1 hover:bg-gray-100 cursor-pointer" data-file={name}>
    <span className="text-xs" data-file={name}>{name}</span>
  </div>
);

export default File;
