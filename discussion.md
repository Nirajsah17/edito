
## 5 Dec 2023

* sync with db(file and folder);
* side bar svg(or placeholder for now) icon based on extension of file.
* How to write code in the editor body(Exploratory)
* Code editor file tab state saved or unsaved (icon based on file). 


## 29-Nov-2023

* user management
  * user name
  * email
  * password
* use file system management
  * root folder
    * files/folder

``` 
dbName:{
  user1: {
    id: uuid,
    rootId: uuid,
    username:'',
    userEmail: '',
    password: ''
  },
  user2: {
    id: uuid,
    rootId: uuid,
    username:'',
    userEmail: '',
    password: ''
  }
  ...
}
```
```
root: {
  rootid: {
    folder1:{
      fileId: uuid,
      filename: ''
    }
  },
  rootid: {},
}
```

```
filesStore:{
  fileId: {
    fileName: '',
    userName:'',
    userid:''
  }
}
```

* indexedDB -library (idb)