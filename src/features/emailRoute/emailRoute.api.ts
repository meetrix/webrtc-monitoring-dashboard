import api from '../../app/axios';

const userVerifyApi = (data: any) => {
  return api.get(`account/verify?token=${data}`);
};
export default userVerifyApi;
