import React from "react";
import TypeIcon from "../TypedIcon";
import { DUMMY_FUNC } from "../../common/consts";

export function CustomDragPreview(props) {
  const item = props.monitorProps.item;
  return (
    <div>
      <div className="icon">
        <TypeIcon
          droppable={item.droppable}
          text={item.text}
          isOpen={false}
          onToggle={DUMMY_FUNC}
        />
      </div>
      <div className="label">{item.text}</div>
    </div>
  );
}

export default CustomDragPreview;
