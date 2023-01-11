/* eslint-disable prettier/prettier */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import moment from 'moment';
import { getUrlParams } from '../../utils/urlUtils';
import Home from './home.view';
import { mockHomeMeetings } from '../../mocks/report';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { meetingListAsync, selectMeetingList } from './home.slice';

export interface IHomeAsyncContainer {}

const HomeAsyncContainer: React.FC<IHomeAsyncContainer> = ({}: IHomeAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();
  const { meetingList, loading } = useAppSelector(selectMeetingList);
  const dispatch = useAppDispatch();

  const [pageSize, setPageSize] = React.useState<number>(10);
  const [page, setPage] = React.useState(0);
  const [dateRange, setDateRange] = React.useState<any>([]);

  const startDate = dateRange[0] as string;
  const endDate = dateRange[1] as string;

  useEffect(() => {
    if (dateRange[0]) {
      dispatch<any>(meetingListAsync({ startDate, endDate, pageSize, page }));
    }
  }, [dateRange, pageSize, page]);

  const createRows = (list: any) => {
    // eslint-disable-next-line prefer-const
    let rows: any = [];
    // eslint-disable-next-line array-callback-return
    list?.map((data: any) => {
      const rowData = {
        id: data.id,
        roomName: data.roomName,
        created: moment(data.created).format('YYYY-MM-DD, h:mm a'),
        destroyed: data.destroyed ? moment(data.destroyed).format('YYYY-MM-DD, h:mm a') : 'On going',
        participants: data.participants,
        faulty: data.faulty,
      };
      rows.push(rowData);
    });
    return rows;
  };

  const meetingListData = mockStats ? mockHomeMeetings : meetingList;
  return (
    <Home
      allData={meetingListData}
      meetingList={createRows(meetingListData.rooms)}
      dateRange={dateRange}
      setDateRange={setDateRange}
      page={page}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
      loading={loading}
    />
  );
};

export default memo(HomeAsyncContainer);
