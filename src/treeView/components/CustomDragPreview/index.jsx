import React from "react";
import TypeIcon from "../TypedIcon";
import { DUMMY_FUNC } from "../../common/consts";
import styles from "./CustomDragPreview.module.css";

export function CustomDragPreview(props) {
  const item = props.monitorProps.item;
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <TypeIcon
          droppable={item.droppable}
          text={item.text}
          isOpen={false}
          onToggle={DUMMY_FUNC}
        />
      </div>
      <div className={styles.label}>{item.text}</div>
    </div>
  );
}

export default CustomDragPreview;
