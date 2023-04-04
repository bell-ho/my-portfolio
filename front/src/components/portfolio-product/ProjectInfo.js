import React, { useCallback, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { ko } from 'date-fns/locale';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextareaAutosize } from '@mui/base';
import { useMutation } from '@tanstack/react-query';
import { updateProjectBasicInfo } from '@/pages/api/project';
import { formatDate } from '@/util/utils';

const ProjectInfo = ({ projectId, name, description, period, link }) => {
  const [startDate, endDate] = (period ? period : '').split(',');

  const [state, setState] = useState([
    {
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : undefined,
      key: 'selection',
    },
  ]);

  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description ?? '');
  const [editedLink, setEditedLink] = useState(link ?? '');
  const [isNameEditing, setIsNameEditing] = useState(false);

  const handleNameChange = useCallback((e) => {
    setEditedName(e.target.value);
  }, []);
  const handleDescChange = useCallback((e) => {
    setEditedDescription(e.target.value);
  }, []);
  const handleLinkChange = useCallback((e) => {
    setEditedLink(e.target.value);
  }, []);

  const updateInfoMutation = useMutation((params) => updateProjectBasicInfo(params), {
    onSuccess: (data) => {
      const { name, description, period, link } = data.project;
      setEditedName(name);
      setEditedDescription(description);
      setEditedLink(link);
    },
  });

  const onClickUpdate = useCallback(async () => {
    const { startDate, endDate } = state[0];
    const params = {
      projectId,
      name: editedName,
      description: editedDescription,
      period: `${formatDate(new Date(startDate))},${formatDate(new Date(endDate))}`,
      link: editedLink,
    };
    await updateInfoMutation.mutate(params);
  }, [state, projectId, editedName, editedDescription, editedLink, updateInfoMutation]);

  return (
    <Wrapper>
      <TypographyCustom variant={'h5'}>프로젝트의 정보를 입력해주세요.</TypographyCustom>

      <TextField
        required
        label={'프로젝트 이름'}
        autoFocus
        value={editedName}
        onChange={handleNameChange}
      />
      <DateInputWrapper>
        <Typography variant={'h5'}>프로젝트 제작 기간</Typography>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          locale={ko}
        />
      </DateInputWrapper>
      <TextareaAutosize
        value={editedDescription}
        onChange={handleDescChange}
        minRows={3}
        placeholder="프로젝트의 간략한 설명을 적어주세요."
        style={{ width: 'auto', border: '1px solid black' }}
      />

      <TextField
        required
        label={'깃 주소'}
        autoFocus
        value={editedLink}
        onChange={handleLinkChange}
      />

      <Button onClick={onClickUpdate} fullWidth variant="contained">
        저장
      </Button>
    </Wrapper>
  );
};

const DateInputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1rem;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
`;

const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;

export default ProjectInfo;
// {!isNameEditing ? (
//   <Typography
//     onClick={() => {
//       setIsNameEditing(true);
//     }}
//     variant={'h1'}
//   >
//     {name}
//   </Typography>
// ) : (
//   <TextField
//     autoFocus
//     value={editedName}
//     onChange={handleNameChange}
//     onBlur={() => setIsNameEditing(false)}
//   />
// )}
