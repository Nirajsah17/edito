const File = ({ name  , uuid, activeFile}) => (
  <div className={uuid === activeFile?.id ? " p-1 cursor-pointer bg-slate-200": "p-1 cursor-pointer"} data-file={uuid} data-name={name}>
    <span className="text-md" data-file={uuid} data-name={name}>{name}</span>
  </div>
);

export default File;
