import React, { memo, useCallback, useState } from 'react';
// import moment from 'moment';
// import { map } from 'lodash';
import { withStyles, WithStyles } from '@mui/styles';
import { Avatar, Grid, Button as MuiButton, Icon } from '@mui/material';
import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Dvr as DvrIcon,
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Call as CallIcon,
} from '@mui/icons-material';
// import prettyMilliseconds from 'pretty-ms';
import clsx from 'clsx';
import styles from './dashboard.styles';
// import { Card } from '../../components/Card';
import { Typography } from '../../components/Typography';
// import { Button } from '../../components/Button';
// import { Table } from '../../components/Table';
import { NoDataLayout } from '../../components/layout';
// import { Clock } from '../../components/Clock';
import {
  emptyOverviewViewIcon,
  InstantMeetingIcon,
  ScheduleMeetingIcon,
} from '../../assets/icons';

interface IDashboardView extends WithStyles<typeof styles> {
  // recentMeetings: Array<any>;
  // todayMeetings: Array<any>;
  // overview: any;
  user: any;
  //   scheduleMeetingOnClick: () => void;
  //   instantMeetingOnClick: () => void;
  //   joinToMeetionButtonClick: (data: any) => void;
  //   openEditMeetionModal: (data: any) => void;
}

const DashboardView: React.FC<IDashboardView> = ({
  // classes,
  // recentMeetings,
  // todayMeetings,
  // overview,
  user,
}: // scheduleMeetingOnClick,
// instantMeetingOnClick,
// joinToMeetionButtonClick,
// openEditMeetionModal,
IDashboardView) => {
  const [isShareMeetingOpen, setIsShareMeetingOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const recentMtnTableColumns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'host',
      label: 'Host  ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => {
          return <div>{value?.email}</div>;
        },
      },
    },
    {
      name: 'beginTime',
      label: 'Time',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any) => {
          return <div>11111</div>;
        },
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  return <Grid container />;
};

export default memo(withStyles(styles)(DashboardView));
