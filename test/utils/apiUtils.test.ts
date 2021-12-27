import { initialize } from '../../src/utils/apiUtils';

describe('apiUtils', () => {
  it('initialize', () => {
    const api = initialize({ baseURL: 'https://test.io', token: 'myToken'});
    expect(api.get).toBeDefined();
    expect(api.post).toBeDefined();
  })
})