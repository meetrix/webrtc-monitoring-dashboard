import api from '../../app/axios';

const resetPasswordApi = (data: any) => {
  return api.post(`account/reset/${data.token}`, data);
};
export default resetPasswordApi;
