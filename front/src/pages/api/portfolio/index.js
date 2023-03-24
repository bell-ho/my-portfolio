import { axios } from '@/util/axios';
import { apiKey } from '@/pages/api/constants';

export const getPortfolios = async (params) => {
  const { data } = await axios.get(`${apiKey.portfolios}/${params}`);

  return data.data.portfolios;
};

export const createPortfolio = async (params) => {
  const { data } = await axios.post(`${apiKey.portfolios}`, params);

  return data.data;
};

export const removePortfolio = async (params) => {
  const { data } = await axios.delete(`${apiKey.portfolios}/${params}`);
};
