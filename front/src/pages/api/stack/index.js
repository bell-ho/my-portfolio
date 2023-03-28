import { axios } from '@/util/axios';
import { apiKey } from '@/pages/api/constants';

export const getStacksByUser = async (params) => {
  const { data } = await axios.get(`${apiKey.stacks}/users/${params}`);
  return data.data.stacks;
};

export const createSkill = async (params) => {
  const { data } = await axios.post(`${apiKey.stacks}`, params);
  return data.data;
};

export const userSkillUpdate = async (params) => {
  const { data } = await axios.post(`${apiKey.stacks}/${params.stackId}/users/${params.userId}`);
  return data.data;
};
