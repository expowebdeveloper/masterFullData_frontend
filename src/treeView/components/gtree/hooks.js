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

export function useHandleDrop(
  setTreeData,
  treeData,
  onAction
) {
  return useCallback(
    (newTree, options) => {
      setTreeData(newTree);

      if (!onAction) return;
      const prevPath = getFullPath(options.dragSourceId, treeData);
      const targetPath = getFullPath(options.dropTargetId, newTree);
      const action = {
        type: "mv",
        source: prevPath,
        target: targetPath
      };
      onAction(action);
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
