import { axios } from '@/util/axios';
import { apiKey } from '@/pages/api/constants';

export const createProject = async (params) => {
  const { data } = await axios.post(`${apiKey.projects}/portfolios/${params.portfolioId}`, params);
  return data.data;
};

export const getProjects = async (params) => {
  const { data } = await axios.get(`${apiKey.projects}/portfolios/${params}`);
  return data.data.projects;
};

export const removeProject = async (params) => {
  const { data } = await axios.delete(`${apiKey.projects}/${params}`);
  return data.data;
};
