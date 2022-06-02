import api from '../../app/axios';

const resetPasswordApi = (data: any) => {
  return api.post(`account/resetpassword/${data.token}`, data);
};
export default resetPasswordApi;
