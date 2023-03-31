import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function EditableTitle({ title, onTitleChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onTitleChange(editedTitle);
    setIsEditing(false);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  return (
    <>
      {isEditing ? (
        <TextField
          value={editedTitle}
          onChange={handleTitleChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSaveClick} edge="end">
                <SaveIcon />
              </IconButton>
            ),
          }}
        />
      ) : (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
          <IconButton onClick={handleEditClick} edge="end">
            <EditIcon />
          </IconButton>
        </Typography>
      )}
    </>
  );
}

export default EditableTitle;
