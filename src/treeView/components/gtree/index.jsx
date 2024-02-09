import { useState, useRef, useEffect } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";

import { sortFn, defaultConfirmDelete } from "../../common/utils";
import { EMPTY_OBJ } from "../../common/consts";
import CustomNode from "../custom-node";
import CustomDragPreview from "../CustomDragPreview";
import {
  useOnEditTreeObj,
  useOnAddTreeObj,
  useOnDeleteTreeObj,
  useHandleDrop,
  useNodeSelect
} from "./hooks";
import { IconsContext } from "../../contexts/icons";
import { Placeholder } from "../placeHolder/PlaceHolder";

function GTree(props) {
  const {
    initialData,
    oldData,
    onAction,
    askConfirmationFn = defaultConfirmDelete,
    iconDict = EMPTY_OBJ,
    initialSelectedId,
  } = props;
  
  const [lastSelectedId, setLastSelectedId] = useState(initialSelectedId);
  const [treeData, setTreeData] = useState(initialData);
  const [selectedNode, setSelectedNode] = useState(null);
  const handleDrop = useHandleDrop(setTreeData, treeData, onAction);
  // const handleDrop = (newTree) => setTreeData(newTree);
  const onEditItem = useOnEditTreeObj(setTreeData, treeData, onAction);
  const onAddFolder = useOnAddTreeObj(setTreeData, true);
  const onAddFile = useOnAddTreeObj(setTreeData, false);
  const onNodeSelect = useNodeSelect(treeData, setLastSelectedId, onAction);
  const onDelete = useOnDeleteTreeObj(
    setTreeData,
    treeData,
    askConfirmationFn,
    onAction
  );

  console.log(treeData,'ccccccccccccccc')

  return (
    <IconsContext.Provider value={iconDict}>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          rootId={0}
          sort={sortFn}
          render={(node, options) => (
            <CustomNode
              node={node}
              options={options}
              onEditItem={onEditItem}
              onAddFolder={onAddFolder}
              onAddFile={onAddFile}
              editMode={node.id === "new"}
              onDelete={onDelete}
              onNodeSelect={onNodeSelect}
              isSelected={lastSelectedId === node.id}
            />
          )}
          dragPreviewRender={(monitorProps) => (
            <CustomDragPreview monitorProps={monitorProps} />
          )}
          canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
            setSelectedNode(dragSource?.id)
            if (dragSource?.parent === dropTargetId) {
              return true;
            }
          }}
          insertDroppableFirst={false}
        
          onDrop={handleDrop}
          classes={{
            root: "gtree_root",
            dropTarget: "dropTarget"
          }}
          dropTargetOffset={5}
          placeholderRender={(node, { depth }) => (
            <Placeholder node={node} depth={depth} />
          )}
        />
      </DndProvider>
    </IconsContext.Provider>
  );
}

export default GTree;
