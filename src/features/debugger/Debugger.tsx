import React from 'react';
import { useGetReportQuery } from '../../services/apiService/endpoints/reportEndpoints';
import { getUrlParams } from '../../utils/urlUtils';
import ReportComponent from './ReportComponent';
import mockReport from '../../mocks/report';

export const Debugger: React.FC = () => {
  // const peers = useAppSelector(selectPeers);
  const { clientId, domain, mockStats } = getUrlParams();
  const { data, error, isLoading } = useGetReportQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });
  const report = mockStats ? mockReport : data;

  if (report && report.data) return <ReportComponent report={report} />;
  return <p>invalid report</p>;
};

export default Debugger;
