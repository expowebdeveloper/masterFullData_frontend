export const sortFn = (treeData) => {
  return treeData.sort((a, b) => {
    const sortOrderA = parseFloat(a.sortOrder);
    const sortOrderB = parseFloat(b.sortOrder);
    if (!isNaN(sortOrderA) && !isNaN(sortOrderB)) {
      return sortOrderA - sortOrderB;
    } else {
      return a.text.localeCompare(b.text);
    }
  });
};

export function newID() {
  const randomAtoZ = Math.floor(Math.random() * 35).toString(36);
  const ts = Date.now().toString(36);
  return ts + "_" + randomAtoZ;
}

export function defaultConfirmDelete(objName) {
  const text = `Are you sure you want to delete ${objName}?\nThe file will be permanently removed.`;

  return new Promise((resolve, reject) => {
    const isConfirmedw = window.confirm(text);
    // const isConfirmed = objName=="node"?true:false;
    if (isConfirmedw) {
      // console.log(isConfirmed,"yesdele")
      resolve();
    } else {
      // console.log(isConfirmed,"no")
      reject(`Not confirmed`);
    }
  });
}

export function flatTreeObjToNodeModel(objArry, parent, currentDimension) {
  //   return [
  //     {
  //       id: obj.id,
  //       parent,
  //       text: obj.name,
  //       droppable: obj.type === "directory",
  //       data: restObj
  //     },
  //   ];
  let newArr = objArry.map((item, index) => {
    return {
      id: item.node.name,
      text: item.node.name,
      sortOrder: item.sortOrder,
      parent: item.node.name == item.parent ? 0 : item.parent,
      droppable: true,
      data: {
        name: item.node.name,
        id: item.node.name,
        type: "directory",
        sort: item.node.sort,
      },
    };
  });

  return newArr;
}

export function getFullPath(id, inTree, currentPath) {
  const node = inTree.find((it) => it.id === id);
  if (!node) return currentPath;
  if (node.parent === 0) {
    return [node.text];
  }
  return [...getFullPath(node.parent, inTree), node.text];
}
