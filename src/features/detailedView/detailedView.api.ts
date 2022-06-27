import api from '../../app/axios';

const callStatsApi = (data: any) => {
  return api.post('incoming', data);
};
export default callStatsApi;

export const troubleshooterDetailsGetAllApi = () => {
  return api.get('troubleshooter');
};
