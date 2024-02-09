import React, { useCallback } from "react";
import {
  getDescendants,
} from "@minoru/react-dnd-treeview";
import { getFullPath, newID } from "../../common/utils";

function buildNewTreeObj(parent, droppable) {
  const tempName = "";
  const tempId = "new";
  const newItem = {
    id: tempId,
    parent,
    text: tempName,
    droppable,
  };
  return newItem;
}

export function useOnAddTreeObj(setTreeData, droppable) {
  const callback = useCallback(
    (parent) => {
      setTreeData((treeData) => {
        const newItem = buildNewTreeObj(parent, droppable);
        return [...treeData, newItem];
      });
    },
    [setTreeData, droppable]
  );
  return callback;
}

function maybeEditItem(id, text, it) {
  const isNewAndEmptyText = id === "new" && text.trim().length === 0;
  if (isNewAndEmptyText) {
    return undefined;
  }
  const maybeNewId = id === "new" ? newID() : id;
  return {
    ...it,
    id: maybeNewId,
    text,
  };
}

function buildAddOrMvAction(node, source, target,text) {
  console.log(node,"node")
  switch (true) {
    case node.id === "new" && !!node.droppable:
      return {
        type: "add-dir",
        source: source,
        text:text
      };
    case node.id === "new":
      return {
        type: "add-file",
        source: target
      };
      case node?.data.type === "directory":
      return {
        type: "rename",
        source,
        target
      };
    default:
      return {
        type: "mv",
        source,
        target
      };
  }
}

function buildDeleteAction(node, source) {
  const type = !!node.droppable ? "delete-dir" : "delete-file";
  return {
    type,
    source
  };
}

function maybeReportDeletedNode(id, extra) {
  const { treeData, onAction } = extra;
  if (!onAction) return;
  const node = treeData.find((it) => it.id === id);
  const source = getFullPath(id, treeData);

  let action = buildDeleteAction(node, source);
  onAction(action);
}

function maybeReportEditedNode(id, text, extra) {
  const { treeData, onAction } = extra;
  const isTextEmpty = text.trim().length === 0;
  if (!onAction || isTextEmpty) return;
  const node = treeData.find((it) => it.id === id);
  const source = getFullPath(id, treeData);
  const target = source.slice(0, -1).concat(text);

  let action = buildAddOrMvAction(node, source, target,text);
  onAction(action);
}

export function useOnEditTreeObj(
  setTreeData,
  treeData,
  onAction
) {
  const callback = useCallback(
    (id, text) => {
      const node = treeData.find((it) => it.id === id);
      const siblings = getDescendants(treeData, node.parent).filter(
        (it) => it.id !== id && it.parent === node.parent
      );
      const doesNameExistsInSiblings = siblings.some((it) => it.text === text);

      if (doesNameExistsInSiblings) return `This name ${text} already exists.`;

      const newTreeData = treeData
        .map((it) => (it.id === id ? maybeEditItem(id, text, it) : it))
        .filter(Boolean);
      setTreeData(newTreeData);

      maybeReportEditedNode(id, text, { treeData, onAction });

      return undefined;
    },
    [setTreeData, treeData, onAction]
  );
  return callback;
}

export function useOnDeleteTreeObj(
  setTreeData,
  treeData,
  askConfirmationFn,
  onAction
) {
  const callback = useCallback(
    (id, text) => {
      const action = () => {
        const deleteIds = [
          id,
          ...getDescendants(treeData, id).map((node) => node.id)
        ];
        const newTreeData = treeData.filter((it) => !deleteIds.includes(it.id));
        setTreeData(newTreeData);
        maybeReportDeletedNode(id, { treeData, onAction });
      };
      askConfirmationFn(text).then(action).catch(console.error);
    },
    [setTreeData, treeData, onAction, askConfirmationFn]
  );
  return callback;
}




function updateSortOrder(newArray, selector, parent) {
  const index = newArray.findIndex(item => item.id === selector && parent === parent );
  if (index === -1) {
    return newArray;
  }
  let upperSortOrder, lowerSortOrder;
  if (index > 0) {
    upperSortOrder = newArray[index - 1].sortOrder;
  }
  if (index < newArray.length - 1) {
    lowerSortOrder = newArray[index + 1].sortOrder;
  }

  console.log(upperSortOrder, lowerSortOrder)

  let newSortOrder;
  if (upperSortOrder !== undefined && lowerSortOrder !== undefined) {
    newSortOrder = (upperSortOrder + lowerSortOrder) / 2;
  } else if (upperSortOrder !== undefined) {
    newSortOrder = upperSortOrder + 1; 
  } else if (lowerSortOrder !== undefined) {
    newSortOrder = lowerSortOrder - 1; 
  } else {
    newSortOrder = 0;
  }
  newArray[index].sortOrder = newSortOrder;
  return { sortedData: newArray, position: index };
}



export function useHandleDrop(
  setTreeData,
  treeData,
  onAction
) {
  return useCallback(
    (newTree, options) => {
      const prevPath = getFullPath(options.dragSourceId, treeData);
      let { sortedData, position } = updateSortOrder(newTree, prevPath[prevPath.length - 1], prevPath[prevPath.length - 2])
      console.log(newTree,'tttt')
      console.log(sortedData, position,'777777777777777777777777777777')
      setTreeData(sortedData);

      if (!onAction) return;
      
      const targetPath = getFullPath(options.dropTargetId, sortedData);
      const action = {
        type: "mv",
        source: prevPath,
        target: targetPath
      };
      onAction(action, position);
    },
    [treeData, setTreeData, onAction]
  );
}

export function useNodeSelect(
  treeData,
  setSelectedId,
  onAction
) {
  return useCallback(
    (id, droppable) => {
      setSelectedId(id);
      if (!onAction) return;

      const source = getFullPath(id, treeData);
      const type = droppable ? "select-dir" : "select-file";
      const action = {
        type,
        source
      };
      onAction(action);
    },
    [treeData, setSelectedId, onAction]
  );
}
