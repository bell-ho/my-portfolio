import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
const SkillsDialog = ({ open, handleClose, handleSubmit, dialogValue, setDialogValue }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new film</DialogTitle>
        <DialogContent>
          <DialogContentText>Did you miss any film in our list? Please, add it!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={dialogValue.title}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                title: event.target.value,
              })
            }
            label="title"
            type="text"
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            value={dialogValue.year}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                year: event.target.value,
              })
            }
            label="year"
            type="number"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default SkillsDialog;
