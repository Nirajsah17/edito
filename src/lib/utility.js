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

export {
    uuid,
    deleteByName
}