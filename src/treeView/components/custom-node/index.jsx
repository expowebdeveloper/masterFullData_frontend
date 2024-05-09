import { useState, memo, useMemo } from "react";
import {
  AiFillFileAdd as FilePlus,
  AiFillFolderAdd as FolderPlus,
  AiFillEdit as Edit,
  AiFillDelete as Trash,
  AiOutlineShareAlt as ShareIcon
} from "react-icons/ai";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { ICON_SIZE_S, INDENT_UNIT } from "../../common/consts";
import TypedIcon from "../TypedIcon";
import Title from "./Title";
import StyledNode, { MaybeSpan } from "./StyledNode";
import { useDispatch } from "react-redux";
import { deletePropertyNode } from "../../../store/slices/dimensionsSlice";
import styles from "./CustomNode.module.css";
import ShareNode from "./ShareNode";
import { createShareNode } from "../../../store/slices/dimensionsSlice";


function FolderActions(props) {
  const { droppable, addFile, addFolder } = props;

  if (!droppable) return null;
  return (
    <>
      {/* <button onClick={addFile} title="Add File">
        <FilePlus className="icon" size={ICON_SIZE_S} />
      </button> */}
      <button onClick={addFolder} title="Add Child">
        <FolderPlus className="icon" size={ICON_SIZE_S} />
      </button>
    </>
  );
}


function CustomTitle({ id, text, editMode, cancelEdit, onEditItem, isShared }) {
  const wrapperClass = isShared ? "shared-node-title" : "";

  return (
      <div className={wrapperClass}>
          <Title
              id={id}
              text={text}
              editMode={editMode}
              cancelEdit={cancelEdit}
              onEditItem={onEditItem}
          />
      </div>
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
  const { id, text, droppable, data } = node;
  const { depth, onToggle, isOpen } = options;
  const indent = depth * INDENT_UNIT;
  const elId = `node_${id}`;
  const [isEditMode, setIsEditMode] = useState(!!initialEditMode);

  const [sharedNodeshow, setSharedNodeshow] = useState(false);
  const [parentNode, setParentNode] = useState("");
  const onShareNodeHandleClose = () => setSharedNodeshow(false);
  const onShareNodeHandle = () => setSharedNodeshow(true);


  const dispatch = useDispatch()
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
    // dispatch(deletePropertyNode(id))
    onDelete(id, text);
  };

  const CreateShareNode = (selectedOption) =>{
    const payload = {
      parent: text,
      child: selectedOption.value,
      dimension: selectedOption.dimension
    }
    dispatch(createShareNode(payload, onShareNodeHandleClose))
  }
  



  const onSelect = () => {
    onNodeSelect(id, !!droppable);
  };
  const dragOverProps = useDragOver(id, isOpen, onToggle);
  return (
    <>
      <div className="container w-25">
        <input
          type="radio"
          name="node"
          id={elId}
          className="hidden"
          onClick={onSelect}
          defaultChecked={isSelected}
        />
        <StyledNode style={{ paddingInlineStart: indent }} {...dragOverProps}>
          <label className="d-flex" htmlFor={elId}>
            <TypedIcon
              text={text}
              droppable={droppable}
              onToggle={onToggle}
              isOpen={isOpen}
            />
            <CustomTitle 
              id={id}
              text={text}
              editMode={isEditMode}
              cancelEdit={resetEdit}
              onEditItem={onEditItem}
              isShared={data?.isShared ? data?.isShared : null}
            />
          </label>

          {data?.isShared === null && (
            <MaybeSpan className="actions" visible={!isEditMode}>
              <button onClick={toggleEdit} title="Rename">
                <Edit className="icon" size={ICON_SIZE_S} />
              </button>
              <FolderActions
                droppable={!!droppable}
                addFile={addFile}
                addFolder={addFolder}
              />
              <button onClick={onShareNodeHandle} title="Share Node">
                <ShareIcon className="icon" size={ICON_SIZE_S} />
              </button>
              <button onClick={onLocalDelete} title="Delete">
                <Trash className="icon" size={ICON_SIZE_S} />
              </button>
            </MaybeSpan>
          )}
        </StyledNode>
      </div>

      <ShareNode
        show={sharedNodeshow}
        setShow={setSharedNodeshow}
        handleClose={onShareNodeHandleClose}
        handleShow={onShareNodeHandle}
        parent={text}
        CreateShareNode={CreateShareNode}
      />

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
