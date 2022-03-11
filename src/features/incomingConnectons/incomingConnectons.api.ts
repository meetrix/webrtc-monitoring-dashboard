import api from '../../app/axios';

const incomingConnectonsApi = (data: any) => {
  return api.post('incoming', data);
};
export default incomingConnectonsApi;
