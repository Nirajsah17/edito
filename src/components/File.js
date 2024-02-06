const File = ({ name  , uuid}) => (
  <div className=" p-1 hover:bg-gray-100 cursor-pointer" data-file={uuid} data-name={name}>
    <span className="text-md" data-file={uuid} data-name={name}>{name}</span>
  </div>
);

export default File;
