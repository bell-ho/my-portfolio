import { axios } from '@/util/axios';
import { apiKey } from '@/pages/api/constants';

export const removeImage = async (params) => {
  const { data } = await axios.delete(`${apiKey.images}/${params}`);
  return data.data;
};
