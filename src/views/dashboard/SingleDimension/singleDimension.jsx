import { useEffect, useState } from "react";
import { flatTreeObjToNodeModel } from "../../../treeView/common/utils";
import GTree from "../../../treeView/components/gtree";
import { useDispatch, useSelector } from "react-redux";
import { addNode, deleteNode, getHierarchy, moveNode, renameNode } from "../../../store/slices/dimensionsSlice";

const SingleDimension = () => {
  const dispatch = useDispatch();
  const { hierarchyList } = useSelector((state) => state.dimensionData);
  const newData = flatTreeObjToNodeModel(hierarchyList, 0);
  useEffect(() => {
    dispatch(getHierarchy("College"));
  }, []);

  const onAction = (v) => {
    console.log("onAction", v);
    let data = {};
    switch (v.type) {
      case "add-dir":
        data = {
          parent: v?.source[v.source.length - 2],
          child: v?.text,
          dimension: "College",
          position: 0,
        };
        console.log(data,"hhh")
        dispatch(addNode(data));
        break;

      case "delete-dir":
        data = {
          name: v.source[v.source.length-1],
          dimension: "College",
        };
        dispatch(deleteNode(data));
        break;

      case "mv":
        if(v.source.length===v.target.length&&v.source[v.source.length-1]!==v.target[v.target.length-1]){
          data = 
            {
              "old_name": v.source[v.source.length-1],
              "new_name": v.target[v.target.length-1],
              "dimension": "College"
            
          };
          dispatch(renameNode(data))
        }else{
          data = {
            node_name: v.source[v.source.length - 1],
            old_parent: v.source[v.source.length - 2],
            new_parent: v.target[v.target.length - 1],
            dimension: "College",
            position: 0,
          };
          console.log(data,"nnew")
          dispatch(moveNode(data))
        }
        
        break;

      default:
        break;
    }

    console.log(data, "data");
  };

  return (
    <>
      <div className="text-center" style={{ marginTop: "120px" }}>
        {newData.length > 0 ? (
          <GTree initialData={newData} onAction={onAction} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SingleDimension;
