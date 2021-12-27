import moxios from 'moxios';
import { AxiosWrapper } from '../../src/utils/axiosWrapper';
describe('API Utils', () => {
  const baseURL = '/base';
  const token = 'myToken';
  const apiUtil = new AxiosWrapper({ baseURL, token });
  const api = apiUtil.getApi();
  beforeEach(() => {
    moxios.install(api);
  });
  afterEach(() => {
    moxios.uninstall(api);
  });

  it('should call /say/hello with Bearer token', async () => {
    moxios.stubRequest('/say/hello', {
      status: 200,
      responseText: 'hello',
    });
    const result = await api.get('/say/hello');
    expect(result.request.headers.Authorization).toBe(`Bearer ${token}`);
    expect(result.config.baseURL).toBe(baseURL);
  });
  it('should update the token', async () => {
    const _token = 'yourToken'
    apiUtil.setToken(_token);
    moxios.stubRequest('/say/hello', {
      status: 200,
      responseText: 'hello',
    });
    const result = await api.get('/say/hello');
    expect(result.request.headers.Authorization).toBe(`Bearer ${_token}`);

  })
});
