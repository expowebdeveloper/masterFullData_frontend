import { useState, memo, useMemo } from "react";
import {
  AiFillFileAdd as FilePlus,
  AiFillFolderAdd as FolderPlus,
  AiFillEdit as Edit,
  AiFillDelete as Trash
} from "react-icons/ai";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { ICON_SIZE_S, INDENT_UNIT } from "../../common/consts";
import TypedIcon from "../TypedIcon";
import Title from "./Title";


function FolderActions(props) {
  const { droppable, addFile, addFolder } = props;
  if (!droppable) return null;
  return (
    <>
      <button onClick={addFile} title="Add File">
        <FilePlus className="icon" size={ICON_SIZE_S} />
      </button>
      <button onClick={addFolder} title="Add Directory">
        <FolderPlus className="icon" size={ICON_SIZE_S} />
      </button>
    </>
  );
}

function CustomNode(props) {
  const {
    editMode: initialEditMode,
    node,
    options,
    onEditItem,
    onAddFolder,
    onAddFile,
    onDelete,
    onNodeSelect,
    isSelected
  } = props;
  const { id, text, droppable } = node;
  const { depth, onToggle, isOpen } = options;
  const indent = depth * INDENT_UNIT;
  const elId = `node_${id}`;
  const [isEditMode, setIsEditMode] = useState(!!initialEditMode);
  const toggleEdit = () => setIsEditMode((b) => !b);
  const resetEdit = () => {
    setIsEditMode(false);
  };
  const addFolder = () => {
    if (!isOpen) onToggle();
    onAddFolder(id);
  };
  const addFile = () => {
    if (!isOpen) onToggle();
    onAddFile(id);
  };
  const onLocalDelete = () => {
    onDelete(id, text);
  };
  const onSelect = () => {
    onNodeSelect(id, !!droppable);
  };
  const dragOverProps = useDragOver(id, isOpen, onToggle);
  return (
    <>
      <input
        type="radio"
        name="node"
        id={elId}
        className="hidden"
        onClick={onSelect}
        defaultChecked={isSelected}
      />
        <label className="content" htmlFor={elId}>
          <TypedIcon
            text={text}
            droppable={droppable}
            onToggle={onToggle}
            isOpen={isOpen}
          />
          <Title
            id={id}
            text={text}
            editMode={isEditMode}
            cancelEdit={resetEdit}
            onEditItem={onEditItem}
          />
        </label>
        
          <button onClick={toggleEdit} title="Rename">
            <Edit className="icon" size={ICON_SIZE_S} />
          </button>
          <FolderActions
            droppable={!!droppable}
            addFile={addFile}
            addFolder={addFolder}
          />
          <button onClick={onLocalDelete} title="Delete">
            <Trash className="icon" size={ICON_SIZE_S} />
          </button>
    </>
  );
}

function FinalNode(props) {
  const memoizedNode = useMemo(() => <CustomNode {...props} />, [
    props.editMode,
    props.onAddFile,
    props.onAddFolder,
    props.onDelete,
    props.onEditItem,
    props.options.isOpen,
    props.options.onToggle,
    props.options.depth,
    props.options.isDropTarget,
    props.options.draggable,
    props.isSelected
  ]);
  return memoizedNode;
}

export default FinalNode;