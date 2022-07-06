import api from '../../app/axios';

// eslint-disable-next-line import/prefer-default-export
export const troubleshooterDetailsGetAllApi = () => {
  return api.get('troubleshooter');
};
