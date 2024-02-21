const File = ({ name , uuid, activeFile}) => (
  <div className={uuid === activeFile?.id ? " px-0.5 my-1 border border-slate-400 cursor-pointer bg-slate-200": "px-0.5 my-1 cursor-pointer hover:bg-slate-200"} data-file={uuid} data-name={name}>
    <span className="text-sm" data-file={uuid} data-name={name}>{name}</span>
  </div>
);

export default File;
