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

  const todayDate = new Date();
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [page, setPage] = React.useState(0);
  const [dateRange, setDateRange] = React.useState<any>([
    moment(todayDate).subtract(1, 'week').calendar(),
    todayDate,
  ]);

  const startDate = moment(dateRange[0]).format('YYYY-MM-DD') as string;
  const endDate = moment(dateRange[1]).format('YYYY-MM-DD') as string;


  useEffect(() => {
    dispatch<any>(meetingListAsync({ startDate, endDate, pageSize, page }));
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
