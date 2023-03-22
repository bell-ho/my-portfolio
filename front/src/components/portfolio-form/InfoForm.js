import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { uploadImages } from '@/util/uploadFileToS3';
import Image from 'next/image';

const InfoForm = () => {
  const imageInputRef = useRef(null);
  const [imagePaths, setImagePaths] = useState([]);

  const onUploadImage = useCallback(async (e) => {
    const reg = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
    const files = Array.from(e.target.files);

    if (files.some((file) => !file.name.match(reg))) {
      alert('이미지만 올려요.');
      return false;
    }

    const imageUrls = await uploadImages(files);
    setImagePaths((prev) => prev.concat(imageUrls));
  }, []);

  const imageButtonClick = useCallback((e) => {
    imageInputRef.current?.click();
  }, []);

  return (
    <Wrapper>
      <InputWrapper>
        <Typography variant={'h2'}>이름</Typography>
        <TextField />
      </InputWrapper>
      <InputWrapper>
        <Typography variant={'h2'}>메인 사진</Typography>

        <ImageInputWrapper>
          <Box
            width={250}
            height={250}
            sx={{
              border: '1px solid black',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.1rem',
            }}
          >
            {!imagePaths[0] ? (
              <Typography variant={'h5'} sx={{ color: 'grey' }}>
                사진을 등록해주세요
              </Typography>
            ) : (
              <Image
                layout={'responsive'}
                width={250}
                height={250}
                src={imagePaths?.[0]}
                alt={'image'}
                style={{ borderRadius: '20px' }}
              />
            )}
          </Box>
          <Button
            onClick={imageButtonClick}
            fullwidth
            variant={'contained'}
            sx={{ fontSize: '20px' }}
          >
            ADD IMAGE
          </Button>
        </ImageInputWrapper>

        <input
          type="file"
          name="image"
          multiple
          hidden
          accept="image/*"
          maxLength="1048576"
          ref={imageInputRef}
          onChange={onUploadImage}
        />
      </InputWrapper>
      <Button fullwidth variant={'contained'} sx={{ fontSize: '20px' }}>
        저장
      </Button>
    </Wrapper>
  );
};
const ImageInputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InputWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
`;

const Wrapper = styled(Box)`
  border-radius: 20px;
  padding: 2rem;
  background-color: white;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;
export default InfoForm;
