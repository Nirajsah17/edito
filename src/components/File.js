const File = ({ name  , uuid}) => (
  <div className=" p-1 hover:bg-gray-100 cursor-pointer" data-file={uuid}>
    <span className="text-md" data-file={uuid}>{name}</span>
  </div>
);

export default File;
