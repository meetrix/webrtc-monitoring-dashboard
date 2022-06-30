import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Monitor from '@meetrix/lib-monitoring';

export default function Troubleshooter(): JSX.Element {
  const monitorRef = useRef<Monitor | null>(null);
  const location = useLocation();

  const token = useMemo(
    () => new URLSearchParams(location.search).get('token'),
    [location.search]
  );
  useEffect(() => {
    if (token) {
      monitorRef.current = new Monitor({ token });
      monitorRef.current.UI();
    }
  }, [token]);

  return <></>;
}
