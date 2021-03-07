import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const TodoTextInput = ({ onSave, isNew, isEditing, ...props }: any) => {
  const [text, setText] = useState(props.text || "");
  const handleSubmit = (e: any) => {
    const text = e.target.value.trim();
    if (e.key === "Enter") {
      onSave(text);
      isNew && setText("");
    }
  };

  const handleChange = (e: any) => setText(e.target.value);

  const handleBlur = (e: any) => !isNew && onSave(e.target.value);

  return (
    <input
      className={clsx({
        edit: isEditing,
        "new-todo": isNew,
      })}
      type="text"
      placeholder={props.placeholder}
      autoFocus={true}
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

TodoTextInput.propTypes = {
  text: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isEditing: PropTypes.bool,
  isNew: PropTypes.bool,
};

export default TodoTextInput;
