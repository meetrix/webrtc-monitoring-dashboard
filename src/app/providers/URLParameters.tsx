import React, { useContext } from 'react';
import { getUrlParams, URLParametersType } from '../../utils/urlUtils';

const { token } = getUrlParams();

const URLParametersContext = React.createContext({ token });

export const URLParametersProvider: React.FC = ({ children }) => {
  // FIXME: Override value if necessary
  return (
    <URLParametersContext.Provider value={{ token }}>
      {children}
    </URLParametersContext.Provider>
  );
};

export const withURLParameters = <T,>(
  Component: React.ComponentType<T & URLParametersType>
) => (): React.FC<T> => {
  const URLParametersWrapper = (props: T) => {
    const URLParameters = useContext(URLParametersContext);
    return <Component URLParameters={URLParameters} {...props} />;
  };

  return URLParametersWrapper;
};
