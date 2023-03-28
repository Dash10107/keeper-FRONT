import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Note = (props) => {
  const { onDelete, id, onEdit, title, content } = props;

  const handleOnDelete = () => {
    onDelete(id);
  };

  const handleOnEdit = () => onEdit();

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
   
     <EditIcon onClick={handleOnEdit} />
      <button onClick={handleOnDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Note;