## 07 Feb 2023

* Pyscript for running python code
* browser eval or iframe can be used to run js code.
* 

## 10 Dec 2023

* Tab in the code editing is not working.
* Tab default behaviour to be prevented , need to handle.
* Undo and redo is already there in the editor box .

## 9 Dec 2023


**collaborative work**

  * polling 
  * connection state management 
  * UI for sender and receiver
* replace prompt with input
* line number in code editor
* fix scrolling in code editor
* Have to figure it out how we can achieve collaborative text editing 
* May use webRTC data channel api.
* demo file is added index.html and index.js

## 8 Dec 2023

* Editor scrolling needs to be fixed when scroll and enter 
* UI needs to be fixed alignemnt of editor 
* navigation tab needs to be fixed
* [editor](https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/)

## 7 Dec 2023


* replace prompt with input
* on click of file, should be selected and open in main body
* side bar svg(or placeholder for now) icon based on extension of file.
* How to write code in the editor body(Exploratory)
* Code editor file tab state saved or unsaved (icon based on file). 

## 6 Dec 2023

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