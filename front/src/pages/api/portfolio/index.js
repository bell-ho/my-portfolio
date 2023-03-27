import { axios } from '@/util/axios';
import { apiKey } from '@/pages/api/constants';

export const getPortfoliosByUser = async (params) => {
  const { data } = await axios.get(`${apiKey.portfolios}/by-user/${params}`);

  return data.data.portfolios;
};

export const createPortfolio = async (params) => {
  const { data } = await axios.post(`${apiKey.portfolios}`, params);

  return data.data;
};

export const removePortfolio = async (params) => {
  const { data } = await axios.delete(`${apiKey.portfolios}/${params}`);
};

export const updatePortfolio = async (params) => {
  const { data } = await axios.put(`${apiKey.portfolios}/${params.id}`, params);
};

export const getPortfolioDetail = async (params) => {
  const { data } = await axios.get(`${apiKey.portfolios}/${params}`);
  return data.data.portfolio;
};

export const updatePortfolioImage = async (params) => {
  // console.log(params);
  const { data } = await axios.put(`${apiKey.portfolios}/image/${params.id}`, params);
};
