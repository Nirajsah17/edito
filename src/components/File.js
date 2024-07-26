const File = ({ name , uuid, activeFile}) => (
  <div className={uuid === activeFile?.id ? "p-1 my-1 border border-b cursor-pointer bg-bg-overlay hover:bg-bg-overlay": "p-1 my-1 cursor-pointer hover:bg-bg-overlay"} data-file={uuid} data-name={name} title={name}>
    <span className="text-sm" data-file={uuid} data-name={name} title={name}>{name}</span>
  </div>
);

export default File;