// Folder and file schema
const folderFile = {
  "name": "Root",
  "type": "folder",
  "children": [
    {
      "name": "Documents",
      "type": "folder",
      "children": [
        {
          "name": "Resume.pdf",
          "type": "file",
          "size": "2MB",
          "created_at": "2023-01-01T12:00:00Z"
        },
        {
          "name": "ProjectProposal.docx",
          "type": "file",
          "size": "1.5MB",
          "created_at": "2023-01-02T09:30:00Z"
        }
      ]
    },
    {
      "name": "Photos",
      "type": "folder",
      "children": [
        {
          "name": "Vacation",
          "type": "folder",
          "children": [
            {
              "name": "Beach.jpg",
              "type": "file",
              "size": "4MB",
              "created_at": "2023-02-15T15:45:00Z"
            },
            {
              "name": "Mountain.jpg",
              "type": "file",
              "size": "3.5MB",
              "created_at": "2023-02-20T10:15:00Z"
            }
          ]
        },
        {
          "name": "Family.jpg",
          "type": "file",
          "size": "2.5MB",
          "created_at": "2023-03-05T18:20:00Z"
        }
      ]
    }
  ]
}
