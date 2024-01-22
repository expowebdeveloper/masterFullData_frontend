import { useRef, useState } from "react";

function useTitleForm(props) {
  const { text, submit, reset, id } = props;
  const isCanceledRef = useRef(false);
  const isSubmittedRef = useRef(false);
  const [error, setError] = useState(undefined);

  function localSubmit(
    localText="",
    wasSubmittedOnEnter = false
  ) {
    const wasSubmittedOnBlur = !wasSubmittedOnEnter;
    // When an existing object, ignore submit request on enter
    const isNew = id === "new";
    const isNotNew = id !== "new";
    const hasErrorAsNotNewOnEnterKey =
      !!error && isNotNew && wasSubmittedOnEnter;
    const isCancelledAndNotNew = isCanceledRef.current && isNotNew;

    if (
      hasErrorAsNotNewOnEnterKey ||
      isSubmittedRef.current ||
      isCancelledAndNotNew
    )
      return;

    isSubmittedRef.current = true;
    const trimmedText = localText.trim();
    const hasErrorAsNotNew = !!error && isNotNew;
    const equalTextsOldAndNewNonEmpty =
      text === localText && trimmedText !== "";
    // When a new object, reset or delete item
    if (hasErrorAsNotNew || equalTextsOldAndNewNonEmpty) return reset();

    const maybeResultError = submit(trimmedText);
    if (maybeResultError && wasSubmittedOnEnter) {
      // //reset submit, to allow submit again
      isSubmittedRef.current = false;
      return setError(maybeResultError);
    } else if (isNew && maybeResultError && wasSubmittedOnBlur) {
      // submit empty str, to allow be deleted
      return submit("");
    }
  }
  const onBlur = (e) => {
    localSubmit(e.currentTarget.value);
  };
  const onKeyUp = (e) => {
    switch (e.key) {
      case "Enter":
        return localSubmit(e.currentTarget.value, true);
      case "Escape":
        isCanceledRef.current = true;
        return reset();
    }
    const isTextEmpty = e.currentTarget.value.trim().length === 0;
    if (isTextEmpty) {
      setError("Title cannot be empty");
    } else if (error) {
      setError(undefined);
    }
    if (isSubmittedRef.current) {
      isSubmittedRef.current = false;
    }
  };
  return {
    text,
    onBlur,
    onKeyUp,
    error
  };
}

function TitleForm(props) {
  const { onBlur, onKeyUp, text, error } = useTitleForm(props);
  return (
    <>
      <div className="node_title_form">
        <input
          type="text"
          name="objectName"
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          defaultValue={text}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoFocus
          required
        />
        <small className="error">{error}</small>
      </div>
    </>
  );
}

export default TitleForm;
