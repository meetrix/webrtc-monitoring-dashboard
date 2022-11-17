/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table';

import styles from './userDetails.styles';
import { selectUserErrors, userErrorsAsync } from './userDetails.slice';
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

  const [user, setUser] = React.useState(userList[0]?._id);

  useEffect(() => {
    dispatch<any>(userErrorsAsync(user));
  }, [user]);

  const columns = [
    { field: 'errorValue', headerName: 'Error Value', flex: 1 },
    { field: 'errorType', headerName: 'Error Type', flex: 1 },
    { field: 'eventSourceType', headerName: 'Event Source Type', flex: 1 },
    { field: 'eventSourceId', headerName: 'Event Source Id', flex: 1 },
    { field: 'roomId', headerName: 'Room Id', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
  ];

  const handleSelectUserChange = (event: any) => {
    setUser(event.target.value as string);
  };
  const handleRowClick = (
    params: any // RowParams
  ) => {
    // console.log('Row', params?.row);
    // navigate('/dashboard/meeting-details');
  };
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topPaper}>
        <Typography className={classes.titleText} variant="h6">
          Users debugger
        </Typography>

        <FormControl variant="outlined" className={classes.selectForm}>
          <InputLabel id="select-user">Select a user</InputLabel>
          <Select
            defaultValue={user}
            onChange={handleSelectUserChange}
            placeholder="Select a user"
            className={classes.select}
          >
            {userList.map((data: any) => {
              return (
                <MenuItem value={data._id}>
                  <em>{data.participantName}</em>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <div className={classes.tableContainer}>
          <Table
            rows={userErrorList}
            getRowId={(row: any) => row._id}
            columns={columns}
            onRowClick={handleRowClick}
            disableSelectionOnClick={false}
          />
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(UserDetails);
