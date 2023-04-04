import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removePortfolio } from '@/pages/api/portfolio';
import { queryKey } from '@/react-query/constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Portfolio = ({ portfolio: { id, name, createDate, modifiedDate } }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { email } = session.user;
  const queryClient = useQueryClient();

  const removePortfolioMutation = useMutation((params) => removePortfolio(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.portfoliosByUser, session?.user?.id]);
    },
  });

  const onClickDelete = useCallback(async () => {
    await removePortfolioMutation.mutate(id);
  }, [id, removePortfolioMutation]);

  return (
    <CardCustom sx={{ minWidth: 275 }}>
      <CardContentCustom>
        <Typography variant={'h2'} sx={{ alignSelf: 'center' }}>
          {name}
        </Typography>
        <Typography variant={'h3'}>마지막 수정일 : {modifiedDate}</Typography>
      </CardContentCustom>
      <CardActions>
        <Button size="large" onClick={() => router.push(`/view/${email}/${id}`)}>
          보기
        </Button>
        <Button size="large" onClick={() => router.push(`/product/${id}`)}>
          수정
        </Button>
        <Button onClick={onClickDelete} size="large">
          삭제
        </Button>
      </CardActions>
    </CardCustom>
  );
};

const CardContentCustom = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const CardCustom = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

export default Portfolio;
