import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// TODO: Fix this to use just '@meetrix/lib-monitoring'
import { Button } from '@mui/material';
import Monitor from '@meetrix/lib-monitoring/dist/lib/lib-call-quality-monitoring';

export default function Troubleshooter(): JSX.Element {
  const monitorRef = useRef<Monitor | null>(null);
  const location = useLocation();

  // TODO: Use plugin token instead of JWT
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
