import TitleForm from "./TitleForm";

function Title(props) {
  const { editMode, cancelEdit, id, text, onEditItem } = props;
  if (editMode) {
    const submit = (text) => {
      const maybeError = onEditItem(id, text);
      if (!maybeError) cancelEdit();
      return maybeError;
    };
    return <TitleForm id={id} text={text} reset={cancelEdit} submit={submit} />;
  }
  return <span className="title">{text}</span>;
}

export default Title;
