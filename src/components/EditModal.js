import React, { useState } from "react";

import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

import Input from "./formElements/Input";
import Textarea from "./formElements/Textarea";

const EditModal = (props) => {
  const { id, openState, handleOnClose, title, content, time } = props;
  const [note, setNote] = useState({
    title: title,
    content: content,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("modalTextArea" + id).focus();
  };

  let date = new Date(time);
  let dateFormat =
    date.toLocaleDateString("en-GB") +
    " " +
    date.toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Modal
      open={openState}
      onClose={() => handleOnClose(id, note)}
      aria-labelledby={"Note title:" + title}
      aria-describedby={"Note content:" + content}
    >
      <form className="editModal create-note" onSubmit={handleSubmit}>
        <Input onChange={handleOnChange} value={note.title} />
        <Textarea
          onChange={handleOnChange}
          value={note.content}
          autocorrect="off" 
          autocapitalize="off" 
          spellcheck="false"
          rows={5}
          id={"modalTextArea" + id}
        />
        <div className="timeEdit">Edited: {dateFormat}</div>
        <Fab>
          <EditIcon onClick={() => handleOnClose(id, note)} />
        </Fab>
      </form>
    </Modal>
  );
};

export default EditModal;