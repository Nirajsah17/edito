function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function deleteByName(tree, name) {
    for (let i = 0; i < tree.length; i++) {
        const item = tree[i];
        if (item.name === name) {
            tree.splice(i, 1);
            return true;
        } else if (item.type === "folder" && item.children) {
            if (deleteByName(item.children, name)) {
                return true;
            }
        }
    }
    return false;
}

function findByEmail(Users,email){
  const _user = Users.find(user=> user.email == email);
  if(_user) return _user;
}

function insertItem(jsonData, parentUUID, newItem) {
    function recursiveInsert(node) {
        if (node.uuid === parentUUID) {
            if (!node.children) {
                node.children = [];
            }
            node.children.push(newItem);
            return true;
        } else if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                if (recursiveInsert(node.children[i])) {
                    return true;
                }
            }
        }
        return false;
    }

    if (recursiveInsert(jsonData)) {
        return jsonData;
    } else {
        console.log("Parent UUID not found in the folder structure.");
        return null;
    }
}

export {
    uuid,
    deleteByName,
    findByEmail,
    insertItem
}