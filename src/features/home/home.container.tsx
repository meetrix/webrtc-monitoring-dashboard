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
  const { meetingList } = useAppSelector(selectMeetingList);
  const dispatch = useAppDispatch();

  const todayDate = new Date();
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [dateRange, setDateRange] = React.useState<any>([
    moment(todayDate).subtract(1, 'week').calendar(),
    todayDate,
  ]);

  const startDate = moment(dateRange[0]).format('YYYY-MM-DD') as string;
  const endDate = moment(dateRange[1]).format('YYYY-MM-DD') as string;


  useEffect(() => {
    console.log('kkkk', startDate);
    dispatch<any>(meetingListAsync({ startDate, endDate, pageSize }));
  }, [dateRange, pageSize]);

  const createRows = (list: any) => {
    // eslint-disable-next-line prefer-const
    let rows: any = [];
    // eslint-disable-next-line array-callback-return
    list?.map((data: any) => {
      const rowData = {
        id: data.id,
        roomName: data.roomName,
        created: moment(data.created).format('YYYY-MM-DD'),
        destroyed: data.destroyed ? moment(data.destroyed).format('YYYY-MM-DD') : 'On going',
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
      pageSize={pageSize}
      setPageSize={setPageSize}
    />
  );
};

export default memo(HomeAsyncContainer);
