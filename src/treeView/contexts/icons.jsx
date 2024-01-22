import React, { createContext, useContext } from "react";
import { FaFolderOpen, FaFolder } from "react-icons/fa";
import { FiFileText as FileText } from "react-icons/fi";
import { EMPTY_OBJ, EMPTY_STR } from "../common/consts";



export const IconsContext = createContext(EMPTY_OBJ);

export const useIconsContext = () => useContext(IconsContext);

export const extractFileExtension = (fileName) => {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex < 0) return EMPTY_STR;
  return fileName.slice(dotIndex + 1);
};

export function useIcon(
  fileName,
  dropable,
  isOpen
) {
  const iconsDict = useIconsContext();
  if (dropable) {
    const Folder =
      iconsDict[`__folderOpen_${isOpen}`] ?? (isOpen ? FaFolderOpen : FaFolder);
    return Folder;
  }

  const fileExt = extractFileExtension(fileName);
  const MaybeFile = iconsDict[fileExt];
  if (MaybeFile) return MaybeFile;
  return FileText; // <FileText className="icon file" size={ICON_SIZE_M} />;
}
