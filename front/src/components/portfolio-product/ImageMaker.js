import React, { Children, useCallback, useRef } from 'react';
import { useImagesByProjectQuery } from '@/react-query/query-hooks/useImagesHook';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { uploadImages } from '@/util/uploadFileToS3';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from '@emotion/styled';
import { Pagination } from 'swiper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/react-query/constants';
import Image from 'next/image';
import { updateProjectImages } from '@/pages/api/project';
import { removeImage } from '@/pages/api/image';
import { Typography } from '@mui/material';

const ImageMaker = ({ projectId }) => {
  const queryClient = useQueryClient();
  const { data: images, isLoading } = useImagesByProjectQuery(projectId);
  const imageInputRef = useRef(null);

  const uploadImagesMutation = useMutation((params) => updateProjectImages(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.imagesByProject, projectId]);
    },
  });

  const onUploadImage = useCallback(
    async (e) => {
      const reg = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
      const files = Array.from(e.target.files);

      if (files.some((file) => !file.name.match(reg))) {
        alert('이미지만');
        return false;
      }

      const imageUrls = await uploadImages(files);
      const params = {
        projectId,
        images: imageUrls,
      };
      await uploadImagesMutation.mutate(params);
    },
    [projectId, uploadImagesMutation],
  );

  const imageButtonClick = useCallback((e) => {
    imageInputRef.current?.click();
  }, []);

  const removeImageMutation = useMutation((params) => removeImage(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.imagesByProject, projectId]);
    },
  });
  const onRemoveImage = useCallback(
    async (id) => {
      await removeImageMutation.mutate(id);
    },
    [removeImageMutation],
  );

  return (
    <Wrapper>
      <TypographyCustom variant={'h5'}>프로젝트 관련 사진을 올려주세요.</TypographyCustom>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        spaceBetween={10}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        mousewheel={true} // 마우스 휠
        modules={[Pagination]} // 모듈추가
        className="mySwiper"
      >
        {Children.toArray(
          images.map((v, i) => (
            <SwiperSlide>
              <SlideWrapper>
                <Image layout={'responsive'} width={300} height={300} src={v.src} alt={v.id} />
                <button onClick={() => onRemoveImage(v.id)} type={'button'}>
                  <span className="material-icons">delete</span>
                </button>
              </SlideWrapper>
            </SwiperSlide>
          )),
        )}
      </Swiper>

      <Button variant={'contained'} onClick={imageButtonClick}>
        사진 올리기
      </Button>

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
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 1rem;

  border: 1px solid #4d4d4d;
  border-radius: 10px;
`;
const SlideWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TypographyCustom = styled(Typography)`
  font-weight: 900;
`;
export default ImageMaker;
