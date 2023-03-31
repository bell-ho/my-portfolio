import { axios } from '@/util/axios';
import { apiKey } from '@/pages/api/constants';

export const removeMainFn = async (params) => {
  const { data } = await axios.delete(`${apiKey.mainFns}/${params}`);
  return data.data;
};
