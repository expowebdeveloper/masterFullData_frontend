import { ICON_SIZE_M, ICON_SIZE_S } from "../common/consts";
import { useIcon } from "../contexts/icons";

function TypedIcon(
  props
) {
  const { text, droppable, isOpen, onToggle } = props;
  const Icon = useIcon(text, !!droppable, isOpen);
  if (droppable) {
    const Folder = Icon; //isOpen ? FaFolderOpen : FaFolder;
    const onClick = (ev) => {
      // to prevent selection on toggle folder open and folder
      ev.preventDefault();
      onToggle();
    };
    return (
      <Folder
        onClick={onClick}
        className="icon folder"
        color="#81CFFA"
        size={ICON_SIZE_M}
      />
    );
  }
  return <Icon className="icon file" size={ICON_SIZE_S} />;
}

export default TypedIcon;
