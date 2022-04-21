/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import {
  Grid,
  Paper,
  Stack,
  Breadcrumbs,
  Tabs,
  Tab,
  Box,
  // Link,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './callStatsMoreInfo.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TextField } from '../../components/TextField';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import Table from '../../components/Table';

type ICallStatsMoreInfoView = WithStyles<typeof styles>;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const CallStatsMoreInfo: React.FC<ICallStatsMoreInfoView> = ({
  classes,
}: ICallStatsMoreInfoView) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newSelectedTab: number
  ): void => {
    setSelectedTab(newSelectedTab);
  };

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        sx={{ flexGrow: 1 }}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 20px)',
      }}
    >
      <Stack spacing={2}>
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{
            color: '#00000061',
            fontWeight: 900,
            '& .MuiBreadcrumbs-separator': {
              fontSize: '2rem',
            },
            '& .MuiTypography-root': {
              fontWeight: 'bold',
            },
          }}
        >
          <Link
            to="/dashboard/call-stat-monitoring"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography variant="h6" color="GrayText">
              Call stat monitoring
            </Typography>
          </Link>
          <Typography variant="h6" color="black">
            807930-8329
          </Typography>
        </Breadcrumbs>
      </Stack>
      <Paper
        elevation={0}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          marginTop: '1vh',
        }}
      >
        <Box
          sx={{
            width: 'calc(100% - 16px)',
            p: 1,
            height: 'calc(100% - 16px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={handleChange}>
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={selectedTab} index={0}>
            Item 1
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            Item 2
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            Item 3
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};

export default memo(withStyles(styles)(CallStatsMoreInfo));
