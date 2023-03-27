import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Box, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { uploadImages } from '@/util/uploadFileToS3';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { updatePortfolio, updatePortfolioImage } from '@/pages/api/portfolio';
import { usePortfoliosDetailQuery } from '@/react-query/query-hooks/usePortfoliosHook';
import { queryKey } from '@/react-query/constants';

const Main = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { portfolioId } = router.query;

  const {
    data: { imageSrc, title, description },
    isLoading,
  } = usePortfoliosDetailQuery(portfolioId);

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [imagePaths, setImagePaths] = useState([]);

  const updateImageMutation = useMutation((params) => updatePortfolioImage(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.portfolios, portfolioId]);
    },
  });

  const onUploadImage = useCallback(
    async (e) => {
      const reg = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
      const files = Array.from(e.target.files);

      if (files.some((file) => !file.name.match(reg))) {
        alert('이미지만 올리세요.');
        return false;
      }

      const imageUrls = await uploadImages(files);
      await updateImageMutation.mutate({ id: portfolioId, src: imageUrls[0] });
      // setImagePaths((prev) => prev.concat(imageUrls));
    },
    [portfolioId, updateImageMutation],
  );

  const imageButtonClick = useCallback((e) => {
    imageInputRef.current?.click();
  }, []);

  const portfolioUpdateMutation = useMutation((params) => updatePortfolio(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.portfolios, portfolioId]);
    },
  });

  const onClickUpdate = useCallback(async () => {
    const title = titleInputRef.current.value;
    const description = descriptionInputRef.current.value;

    const params = {
      id: portfolioId,
      title,
      description,
    };

    await portfolioUpdateMutation.mutate(params);
  }, [portfolioId, portfolioUpdateMutation]);

  return (
    <Wrapper id={'main'}>
      <ImageContentWrapper>
        {!imageSrc ? (
          <Button
            onClick={imageButtonClick}
            fullwidth
            variant={'contained'}
            sx={{ fontSize: '20px' }}
          >
            이미지를 올려주세요
          </Button>
        ) : (
          <ImageBox>
            <ImageCustom width={250} height={250} src={imageSrc} alt={'image'} />
            <Button
              onClick={imageButtonClick}
              fullwidth
              variant={'contained'}
              sx={{ fontSize: '15px', position: 'absolute', bottom: 100, opacity: 0.8 }}
            >
              수정
            </Button>
          </ImageBox>
        )}

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
      </ImageContentWrapper>

      <TextField required id="outlined-required" label="타이틀" inputRef={titleInputRef} />
      <TextField required id="outlined-required" label="설명" inputRef={descriptionInputRef} />

      <Button onClick={onClickUpdate} variant={'contained'} sx={{ fontSize: '15px' }}>
        저장
      </Button>

      <TypographyCustom variant={'h1'}>{title}</TypographyCustom>
      <TypographyCustom variant={'h2'}>{description}</TypographyCustom>
    </Wrapper>
  );
};

const ImageBox = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

const Wrapper = styled(Box)`
  background: url('/images/home_background.png') center/cover no-repeat;
  padding: 7.5rem 2.5rem 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ImageContentWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: #e06b6b;
  border: 2px solid var(--color-light-white);
`;

const ImageCustom = styled(Image)`
  border-radius: 50%;
  background-color: #e06b6b;
  border: 2px solid var(--color-light-white);
`;
const TypographyCustom = styled(Typography)`
  color: var(--color-white);
`;
export default Main;
