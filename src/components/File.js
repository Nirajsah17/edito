const File = ({ name  , uuid}) => (
  <div className=" p-1 hover:bg-gray-100 cursor-pointer" data-file={uuid}>
    <span className="text-xs" data-file={uuid}>{name}</span>
  </div>
);

export default File;
