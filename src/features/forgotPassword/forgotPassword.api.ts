import api from '../../app/axios';

const forgotPasswordApi = (data: any) => {
  return api.post('account/forgot', data);
};
export default forgotPasswordApi;
