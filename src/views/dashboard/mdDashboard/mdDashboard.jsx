import React from 'react'
import GTree from '../../../treeView/components/gtree';
import { flatTreeObjToNodeModel } from '../../../treeView/common/utils';

const MdDashboard = () => {
   const fakeServerData = {
    id: "A",
    name: "Root",
    type: "directory",
    children: [
      {
        id: "B",
        name: "Node 1",
        type: "directory",
        children: [
          {
            id: "D",
            name: "Node 3",
            type: "file",
          },
        ],
      },
      {
        id: "221",
        name: "index.js",
        type: "file",
      },
      {
        id: "222",
        name: "index.ts",
        type: "file",
      },
      {
        id: "224",
        name: "index.html",
        type: "file",
      },
      {
        id: "225",
        name: "index.py",
        type: "file",
      },
      { id: "C", name: "Node 2", type: "file" },
      {
        id: "B1",
        name: "Node 11",
        type: "directory",
        children: [
          {
            id: "D1",
            name: "Node 32",
            type: "file",
          },
          {
            id: "B2",
            name: "Node 12",
            type: "directory",
            children: [
              {
                id: "22",
                name: "Node 32",
                type: "file",
              },
            ],
          },
        ],
      },
    ],
  };
  const newData = flatTreeObjToNodeModel(fakeServerData, 0);
  const onAction = (v) =>{
    console.log("onAction", v);
    console.log(newData,"kkk")
  } 
  
  return (
    <div>
<GTree initialData={newData} onAction={onAction} />
    </div>
  )
}

export default MdDashboard