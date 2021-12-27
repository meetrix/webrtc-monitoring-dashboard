import { getToken, setToken, removeToken, TOKEN_KEY } from '../../src/utils/localStorageUtils';

describe('LocalStorageUtils', () => {
  const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
  const getItmeSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
  const removeItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
  it('should set token', () => {
    setToken('mytoken');
    expect(setItemSpy).toBeCalledWith(TOKEN_KEY, 'mytoken');
  });

  it('should remove token', () => {
    getToken();
    expect(getItmeSpy).toBeCalledWith(TOKEN_KEY);
  })

  it('should remove token', () => {
    removeToken();
    expect(removeItemSpy).toBeCalledWith(TOKEN_KEY);
  });

});