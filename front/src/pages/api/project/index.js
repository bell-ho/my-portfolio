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

export const getProjectImages = async (params) => {
  const { data } = await axios.get(`${apiKey.projects}/images/${params}`);
  return data.data.images;
};

export const updateProjectImages = async (params) => {
  const { data } = await axios.put(`${apiKey.projects}/images/${params.projectId}`, params);
  return data.data;
};

export const createMainFn = async (params) => {
  const { data } = await axios.post(`${apiKey.projects}/main-fn/${params.projectId}`, params);
  return data.data;
};

export const getProjectMainFns = async (params) => {
  const { data } = await axios.get(`${apiKey.projects}/main-fn/${params}`);
  return data.data.mainFns;
};
