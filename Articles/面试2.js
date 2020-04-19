function jinxiang(root) {
    let list = transformTreeToList(root);


    for (let i = 0; i < n; i++) {
        list.splice()
    }
}


// tree 转 list
function transformTreeToList(rootNode, nodeList) {
    // let nodeList = []
    if (!nodeList) {
        nodeList = []
    }
    nodeList.push(rootNode.value)
    // transformTreeToList(rootNode.leftChild, nodeList)

    // transformTreeToList(rootNode.rightChild, nodeList)
}