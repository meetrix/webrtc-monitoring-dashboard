import api from '../../app/axios';

export const userVerifyApi = (data: any) => {
  return api.get(`account/verify/?token=${data}`);
};
export const resetApi = (data: any) => {
  return api.get(`account/resetpassword/?token=${data}`);
};
