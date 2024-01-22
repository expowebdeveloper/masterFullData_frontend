export interface ITreeObj {
    id: string | number;
    name: string;
    type: "directory" | "file";
    updatedAt?: number;
  }
  
  export interface ITreeObjFile extends ITreeObj {
    type: "file";
  }
  
  export interface ITreeObjDir extends ITreeObj {
    type: "directory";
    children: TreeObj[];
  }
  
  export type TreeObj = ITreeObjFile | ITreeObjDir;
  
  export interface IExtraActions {
    delete: (id: string) => void;
    addFile: (parentId: string) => void;
    addFolder: (parentId: string) => void;
  }
  
  interface ITrackableAction {
    type: string;
    source: string[];
  }
  
  interface ITrackableTargetableAction extends ITrackableAction {
    target: string[];
  }
  
  export interface IMVAction extends ITrackableTargetableAction {
    type: "mv";
  }
  
  export interface IDeleteDirectoryAction extends ITrackableAction {
    type: "delete-dir";
  }
  
  export interface IDeleteFileAction extends ITrackableAction {
    type: "delete-file";
  }
  
  export interface IAddFileAction extends ITrackableAction {
    type: "add-file";
  }
  
  export interface IAddDirectoryAction extends ITrackableAction {
    type: "add-dir";
  }
  
  export interface ISelectFileAction extends ITrackableAction {
    type: "select-file";
  }
  
  export interface ISelectDirectoryAction extends ITrackableAction {
    type: "select-dir";
  }
  
  export type TrackableAction =
    | IMVAction
    | IDeleteDirectoryAction
    | IDeleteFileAction
    | IAddFileAction
    | IAddDirectoryAction
    | ISelectFileAction
    | ISelectDirectoryAction;
  