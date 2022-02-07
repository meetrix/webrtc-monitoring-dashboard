import React from 'react';
import {
  useGetReportQuery,
  useGetConnectionInfoQuery,
  useGetOtherInfoQuery,
} from '../../services/apiService/endpoints/reportEndpoints';
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
  // console.log(data);
  const data2 = useGetConnectionInfoQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });
  const connectionStatus = data2.data;
  // console.log(connectionStatus);

  const data3 = useGetOtherInfoQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });
  const otherInfo = data3.data;
  // console.log(otherInfo);

  const report = mockStats ? mockReport : data;

  if (report && report.data && connectionStatus && otherInfo) {
    // if (!connectionStatus.data) {
    //   const temp = { data: 'undefined' };
    //   connectionStatus = temp;
    // }
    return (
      <ReportComponent
        report={report}
        connectionStatus={connectionStatus}
        otherInfo={otherInfo}
      />
    );
  }
  return <p>invalid report</p>;
};

export default Debugger;
