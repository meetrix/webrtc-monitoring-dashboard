import qs from 'qs';

export interface URLParametersType {
  token?: string | undefined;
  clientId?: string;
  domain?: string;
  mockStats?: boolean;
}

export const getUrlParams = (
  options?: qs.IStringifyOptions,
  urlParams?: string
): URLParametersType => {
  const parameters = urlParams || window?.location?.search;
  if (!parameters) return {};
  // With alowDots, we can parse nested objects. eg: a.b=c -> { a: { b: 'c' } }
  const { token, domain, clientId, mockStats }: URLParametersType = qs.parse(
    parameters,
    {
      allowDots: true,
      ignoreQueryPrefix: true,
      ...options,
    }
  );

  return { token, domain, clientId, mockStats: !!mockStats };
};
export default getUrlParams;
