import React, { Fragment, useCallback, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { ko } from 'date-fns/locale';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
const ProjectInfo = ({ name, period }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const [editedName, setEditedName] = useState(name);
  const [isNameEditing, setIsNameEditing] = useState(false);

  const handleNameChange = useCallback((e) => {
    setEditedName(e.target.value);
  }, []);

  return (
    <Fragment>
      {!isNameEditing ? (
        <Typography
          onClick={() => {
            setIsNameEditing(true);
          }}
          variant={'h1'}
        >
          {name}
        </Typography>
      ) : (
        <TextField
          autoFocus
          value={editedName}
          onChange={handleNameChange}
          onBlur={() => setIsNameEditing(false)}
        />
      )}
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        locale={ko}
      />
    </Fragment>
  );
};

export default ProjectInfo;
