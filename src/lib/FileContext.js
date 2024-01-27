import { createContext } from "react";

const FileContext = createContext({
  dir: {
    "name": "Root",
    "type": "folder",
    "children": [{
        "name": "Home",
        "type": "folder",
        "children": [{
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