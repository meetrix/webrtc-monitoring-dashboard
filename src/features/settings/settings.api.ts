import api from '../../app/axios';

const incomingConnectionsApi = (data: any) => {
  return api.post('incoming', data);
};
export default incomingConnectionsApi;

// TODO: Maybe extract below into a new file?

export const pluginGetAllApi = () => {
  return api.get('plugins');
};

export const pluginCreateApi = (data: any) => {
  return api.post('plugins', data);
};

export const pluginGetApi = (id: string) => {
  return api.get(`plugins/${id}`);
};

export const pluginRevokeApi = (id: string) => {
  return api.delete(`plugins/${id}`);
};

export const pluginRegenerateApi = (id: string) => {
  return api.patch(`plugins/${id}`);
};
export const iceServerConfigSetApi = ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  return api.put(`plugins/${id}/ice-servers`, data);
};

export const iceServerConfigGetApi = (id: string) => {
  return api.get(`plugins/${id}/ice-servers`);
};
