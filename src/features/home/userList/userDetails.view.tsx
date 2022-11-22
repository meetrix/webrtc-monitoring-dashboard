/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Button, Paper, Typography } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Table from '../../../components/Table';

import styles from './userList.styles';
import { selectUserErrors, userErrorsAsync } from './userList.slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export interface IUserDetailsView extends WithStyles<typeof styles> {
  userList?: any;
}

const UserDetails: React.FC<IUserDetailsView> = ({
  classes,
  userList,
}: IUserDetailsView) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userErrorList } = useAppSelector(selectUserErrors);
  const { userId, roomId } = useParams();

  const [pageSize, setPageSize] = React.useState<number>(10);

  useEffect(() => {
    dispatch<any>(userErrorsAsync({ userId, pageSize }));
  }, [pageSize]);

  const columns = [
    { field: 'errorValue', headerName: 'Error Value', flex: 1 },
    { field: 'errorType', headerName: 'Error Type', flex: 2 },
    { field: 'eventSourceType', headerName: 'Source Type', flex: 1 },
    { field: 'eventSourceId', headerName: 'Source Id', flex: 1 },
    { field: 'createdAt', headerName: 'Time', flex: 2 },
  ];

  const createRows = (list: any) => {
    // eslint-disable-next-line prefer-const
    let rows: any = [];
    // eslint-disable-next-line array-callback-return
    list?.map((data: any) => {
      const rowData = {
        id: data._id,
        errorValue: data.errorValue,
        errorType: data.errorType,
        eventSourceType: data.eventSourceType,
        eventSourceId: data.eventSourceId,
        createdAt: moment(data.createdAt).format('YYYY-MM-DD, h:mm a'),
      };
      rows.push(rowData);
    });
    return rows;
  };

  const handleRowClick = (
    params: any // RowParams
  ) => {
    // navigate('/dashboard/meeting-details');
  };
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topPaper}>
        <div>
          <Button
            onClick={() => navigate(`/dashboard/${roomId}`)}
            variant="text"
          >
            &#10094; Back
          </Button>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography className={classes.titleText} variant="h6">
            Users debugger
          </Typography>
          <div style={{ display: 'flex' }}>
            <div>
              <Typography variant="body2">Participant Name</Typography>
              <Typography variant="body2">Participant Id</Typography>
              <Typography variant="body2">Room Name</Typography>
              <Typography variant="body2">Room Id</Typography>
              <Typography variant="body2">Date</Typography>
            </div>
            <div>
              <Typography variant="body2">
                &nbsp;:{' '}
                {userErrorList[0]?.participantId.participantName ||
                  'Not available'}
              </Typography>
              <Typography variant="body2">
                &nbsp;: {userErrorList[0]?.participantId._id || 'Not available'}
              </Typography>
              <Typography variant="body2">
                &nbsp;: {userErrorList[0]?.roomId.roomName || 'Not available'}
              </Typography>
              <Typography variant="body2">
                &nbsp;: {userErrorList[0]?.roomId.id || 'Not available'}
              </Typography>
              <Typography variant="body2">
                &nbsp;:{' '}
                {moment(userErrorList[0]?.createdAt).format('YYYY-MM-DD') ||
                  'Not available'}
              </Typography>
            </div>
          </div>
        </div>

        <div className={classes.tableContainer}>
          <Table
            rows={createRows(userErrorList)}
            columns={columns}
            onRowClick={handleRowClick}
            disableSelectionOnClick={false}
            rowsPerPageOptions={[10, 20, 50]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(UserDetails);
