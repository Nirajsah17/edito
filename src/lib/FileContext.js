import { createContext } from "react";

const FileContext = createContext({
  dir: {
    "name": "Root",
    "type": "folder",
    "children": [{
        "name": "Documents",
        "type": "folder",
        "children": [{
            "name": "Resume.pdf",
            "type": "file",
            "size": "2MB",
            "created_at": "2023-01-01T12:00:00Z"
          }]
      }
    ]
  }
});

export default FileContext;