import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/navbar';
import GTree from '../../../treeView/components/gtree';
import { flatTreeObjToNodeModel } from '../../../treeView/common/utils';
import CreateDimensions from '../../../components/dimensions/CreateDimensions';
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
        name: "index90.js",
        type: "file",
        dimension:"i"
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
   console.log(newData,"newData") 
   console.log("onAction", v);
  } 
  return (
    <>
      <Navbar />
      <Sidebar/>
      <section className='main-wrapper dimensions-wrapper'>
        <h3 className='page-name mb-4'>Dimensions</h3>
        <Container fluid>
          <div className='inner-main-wrapper'>
           <CreateDimensions/>
            <GTree initialData={newData} onAction={onAction} />
          </div>
        </Container>
      </section>
    </>
  )
}

export default MdDashboard