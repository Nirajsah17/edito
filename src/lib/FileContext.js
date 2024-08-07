import { createContext } from "react";

const FileContext = createContext({
  dir: {
    "uuid": "asa13513-wiqgds",
    "name": "Root",
    "type": "folder",
    "children": [{
      "uuid": "asa13513-wiqgds-1631",
      "name": "Home",
      "type": "folder",
      "children": [{
        "uuid": "asa13513-wiqgds-kjahs",
        "name": "editor.txt",
        "type": "file",
        "size": "2MB",
        "created_at": "2023-01-01T12:00:00Z"
      }]
    }
    ]
  }
});

export default FileContext;