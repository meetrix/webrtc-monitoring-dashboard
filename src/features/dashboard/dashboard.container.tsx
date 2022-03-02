/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect, useState } from 'react';
// import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAuth } from '../auth/auth.slice';
import DashboardView from './dashboard.view';
import { generateMeetingUrl } from '../../helper/conference';

export interface IDashboardContainer {}

const DashboardContainer: React.FC<IDashboardContainer> = ({}: IDashboardContainer) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [recentMeetings, setRecentMeetings] = useState<Array<any>>([]);
  const [todayMeetings, setTodayMeetings] = useState<Array<any>>([]);

  useEffect(() => {
    // dispatch(fetchAllMeetingsAsync(null));
  }, []);

  useEffect(() => {
    // const now = new Date().toISOString();
    // // const dayStart = moment().startOf('day').toISOString();
    // const dayEnd = moment().endOf('day').toISOString();
    // const past = meetings?.list
    //   ?.filter(({ beginTime }) => beginTime <= now)
    //   .sort((a, b) => (a.beginTime - b.beginTime ? 1 : -1));
    // const today = meetings?.list
    //   ?.filter(({ beginTime }) => beginTime >= now && beginTime <= dayEnd)
    //   .sort((a, b) => (a.beginTime - b.beginTime ? -1 : 1));
    // setTodayMeetings(today);
    // setRecentMeetings(past);
  }, []);

  // const _scheduleMeetingOnClick = () => {
  //   dispatch(scheduleMeetingActions.openScheduleModal());
  // };

  // const _instantMeetingOnClick = () => {
  //   dispatch(scheduleMeetingActions.openInstantMeetingModal());
  // };

  // const _joinToMeetionButtonClick = (data: any) => {
  //   const url = generateMeetingUrl(data?.location, false);
  //   navigate(url);
  // };

  // const _openEditMeetionModal = (data: any) => {
  //   dispatch(scheduleMeetingActions.openEditMeetingModal(data));
  // };

  return (
    <>
      <DashboardView user={auth?.user} />
      {/* <ScheduleMeetingModal />
      <InstantMeetingmodal /> */}
    </>
  );
};

export default memo(DashboardContainer);
