import React from 'react';
import {
  useGetReportQuery,
  useGetConnectionInfoQuery,
  useGetOtherInfoQuery,
  useGetMediaInfoQuery,
} from '../../services/apiService/endpoints/reportEndpoints';
import { getUrlParams } from '../../utils/urlUtils';
import ReportComponent from './ReportComponent';
import {
  mockConnectionStatus,
  mockMediaInfo,
  mockOtherInfo,
  mockReport,
} from '../../mocks/report';

export const Debugger: React.FC = () => {
  // const peers = useAppSelector(selectPeers);
  const { clientId, domain, mockStats } = getUrlParams();

  const { data, error, isLoading } = useGetReportQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });

  const data2 = useGetConnectionInfoQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });

  const data3 = useGetOtherInfoQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });

  const data4 = useGetMediaInfoQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });

  const report = mockStats ? mockReport : data;
  const connectionStatus = mockStats ? mockConnectionStatus : data2.data;
  const otherInfo = mockStats ? mockOtherInfo : data3.data;
  const mediaInfo = mockStats ? mockMediaInfo : data4.data;
  // console.log(report);
  // console.log(connectionStatus);
  // console.log(otherInfo);
  // console.log(mediaInfo);

  if (
    report &&
    report.data &&
    mediaInfo &&
    mediaInfo.data &&
    connectionStatus &&
    otherInfo
  ) {
    return (
      <ReportComponent
        report={report}
        connectionStatus={connectionStatus}
        otherInfo={otherInfo}
        mediaInfo={mediaInfo}
      />
    );
  }
  return <p>invalid report</p>;
};

export default Debugger;
