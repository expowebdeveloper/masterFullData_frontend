export function sortFn(a,b) {
  return (
    Number(b.droppable) - Number(a.droppable) || a.text.localeCompare(b.text)
  );
}

export function newID() {
  const randomAtoZ = Math.floor(Math.random() * 35).toString(36);
  const ts = Date.now().toString(36);
  return ts + "_" + randomAtoZ;
}

export function defaultConfirmDelete(objName) {
  const text = `Are you sure you want to delete ${objName}?\nThe file will be permanently removed.`;
  return new Promise((resolve, reject) => {
    const isConfirmed = window.confirm(text);
    if (isConfirmed) {
      resolve();
    } else {
      reject(`Not confirmed`);
    }
  });
}

export function flatTreeObjToNodeModel(
  objArry,
  parent
){
//   return [
//     {
//       id: obj.id,
//       parent,
//       text: obj.name,
//       droppable: obj.type === "directory",
//       data: restObj
//     },
//   ];
let newArr= objArry.map((item,index)=>{
    return {
        id:item.node.name,
        text:item.node.name,
        parent:item.node.name==item.parent?0:item.parent,
        droppable:true,
        data: {
            name: item.node.name,
            id:item.node.name,
            type: "directory",
        }

    }
})

return newArr

}

export function getFullPath(
  id,
  inTree,
  currentPath
){
  const node = inTree.find((it) => it.id === id);
  if (!node) return currentPath;
  if (node.parent === 0) {
    return [node.text];
  }
  return [...getFullPath(node.parent, inTree), node.text];
}
