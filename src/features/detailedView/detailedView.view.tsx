/* eslint-disable no-irregular-whitespace */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useEffect, useMemo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import {
  ButtonProps,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import clsx from 'clsx';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import styles from './detailedView.styles';
import DetailedViewTableHead from './detailedViewTableHead';
import TablePaginationActions from './detailedViewPagination';

interface IDetailedView extends WithStyles<ButtonProps & typeof styles> {
  detailViewList: any;
}

// Sort table using connected date and the test ID
const useSortableData = (
  troubleshooterDetailsForSort: any,
  config: { key: any; direction: string }
) => {
  const sortedItems = React.useMemo(() => {
    const sortableItems = [...troubleshooterDetailsForSort];
    if (config !== null) {
      sortableItems.sort((a, b) => {
        if (a[config.key] < b[config.key]) {
          return config.direction === 'ascending' ? -1 : 1;
        }
        if (a[config.key] > b[config.key]) {
          return config.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [troubleshooterDetailsForSort, config]);

  return { troubleshooterDetailsForSort: sortedItems };
};

// Sort the table using browser version
const useBrowserVersionToSort = (
  troubleshooterDetailsForBrowserVersionSort: any,
  direction: string
) => {
  const sortedItems = useMemo(() => {
    const sortableItems = [...troubleshooterDetailsForBrowserVersionSort];
    sortableItems.sort((a, b) => {
      if (a?.metadata?.browser?.version < b.metadata?.browser?.version) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a.metadata?.browser?.version > b.metadata?.browser?.version) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [troubleshooterDetailsForBrowserVersionSort, direction]);

  return { troubleshooterDetailsForBrowserVersionSort: sortedItems };
};

const popperSx: SxProps = {
  marginTop: '10px',
  color: '#5F5F5F',
  '& .MuiPickersDay-root': {
    color: '#5F5F5F',
  },
  '& .MuiPickersDay-root.Mui-selected': {
    backgroundColor: '#4A74E9 !important',
  },
  '& .Mui-selected': {
    color: '#ffffff',
    backgroundColor: '#4A74E9 !important',
  },
  '& .MuiIconButton-root': {
    color: '#4A74E9',
  },
  '& .MuiPickersArrowSwitcher-button.Mui-disabled': {
    color: '#00000061 !important',
  },
};
const DetailedView: React.FC<IDetailedView> = ({
  classes,
  detailViewList,
}: IDetailedView) => {
  const [orderBy, setOrderBy] = useState<string>('_id');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortDirection, setSortDirection] = useState<string>('ascending');
  const [search, setSearch] = useState<string>('');
  const [initialDetailList, setInitialDetailList] = useState(
    detailViewList && detailViewList.length > 0 ? detailViewList : []
  );

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const tempDetailList: any[] = [];

  useEffect(() => {
    if (detailViewList && detailViewList.length) {
      detailViewList
        .filter((row: any) => {
          let filterPass = true;
          const date = new Date(row.createdAt);
          if (startDate) {
            filterPass = filterPass && new Date(startDate) < date;
          }
          if (endDate) {
            filterPass = filterPass && new Date(endDate) > date;
          }
          return filterPass;
        })
        .filter((item: any) => item._id.includes(search))
        .map((item: any) => {
          tempDetailList.push(item);
        });
      setInitialDetailList(tempDetailList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, detailViewList, sortDirection, startDate, endDate, search]);

  const { troubleshooterDetailsForSort } = useSortableData(
    initialDetailList && initialDetailList.length > 0 ? initialDetailList : [],
    {
      key: orderBy,
      direction: sortDirection,
    }
  );
  const {
    troubleshooterDetailsForBrowserVersionSort,
  } = useBrowserVersionToSort(
    initialDetailList && initialDetailList.length > 0 ? initialDetailList : [],
    sortDirection
  );

  const [troubleshooterDetails, setTroubleshooterDetails] = useState(
    troubleshooterDetailsForSort
  );

  useEffect(() => {
    if (orderBy === 'browserVersion') {
      setTroubleshooterDetails(troubleshooterDetailsForBrowserVersionSort);
    } else {
      setTroubleshooterDetails(troubleshooterDetailsForSort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, detailViewList, sortDirection, initialDetailList]);

  const handleSelect = (event: SelectChangeEvent) => {
    setOrderBy(event.target.value as string);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - troubleshooterDetails.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOrderButtonClick = () => {
    if (sortDirection === 'ascending') {
      setSortDirection('descending');
    }
    if (sortDirection === 'descending') {
      setSortDirection('ascending');
    }
  };

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleText}>Troubleshooter &gt; Detailed View</div>
      <Grid container spacing={1}>
        <Grid item sm={12} lg={4} className={classes.gridItem}>
          <div style={{ display: 'flex' }}>
            <div className={classes.paperTextDark}>Test ID: &nbsp;</div>
            <TextField
              value={search}
              onChange={handleSearch}
              className={classes.textField}
            />
          </div>
        </Grid>
        <Grid
          item
          sm={7}
          lg={5}
          className={clsx(classes.datePickerWrapper, classes.gridItem)}
        >
          <div style={{ display: 'flex', paddingRight: '10px' }}>
            <div className={classes.paperTextDark}>From: &nbsp;</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="dd/MM/yyyy"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                maxDate={new Date()}
                PaperProps={{
                  sx: popperSx,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{ shrink: false }}
                    className={classes.datePicker}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div style={{ display: 'flex' }}>
            <div className={classes.paperTextDark}>To: &nbsp;</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="dd/MM/yyyy"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                maxDate={new Date()}
                PaperProps={{
                  sx: popperSx,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{ shrink: false }}
                    className={classes.datePicker}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </Grid>
        <Grid item sm={5} lg={3} className={classes.gridItem}>
          <div
            style={{
              display: 'flex',
              paddingRight: '10px',
              justifyContent: 'flex-end',
            }}
          >
            <div className={classes.paperTextDark}>Sort by: &nbsp;</div>
            <Box>
              <Select
                key={orderBy}
                value={orderBy}
                onChange={handleSelect}
                displayEmpty
                inputProps={{
                  'aria-label': 'Without label',
                }}
                className={clsx(classes.paperTextDark, classes.sortDropdown)}
                variant="outlined"
                MenuProps={{ classes: { paper: classes.dropdown } }}
              >
                <MenuItem
                  value="_id"
                  className={classes.paperTextDark}
                  key="testId"
                >
                  Test ID
                </MenuItem>
                <MenuItem
                  value="createdAt"
                  className={classes.paperTextDark}
                  key="dateConnected"
                >
                  Date Connected
                </MenuItem>
                <MenuItem
                  value="browserVersion"
                  className={classes.paperTextDark}
                  key="browserVersion"
                >
                  Browser Version
                </MenuItem>
              </Select>
            </Box>
            <IconButton
              onClick={handleOrderButtonClick}
              className={classes.iconButton}
            >
              {sortDirection === 'ascending' ? (
                <Tooltip
                  title="Ascending order"
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                >
                  <ArrowUpwardIcon />
                </Tooltip>
              ) : (
                <Tooltip
                  title="Descending order"
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                >
                  <ArrowDownwardIcon />
                </Tooltip>
              )}
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }} className={classes.paper}>
          <TableContainer className={classes.tableCells}>
            <Table sx={{ minWidth: 750 }} stickyHeader>
              <DetailedViewTableHead classes={classes} />
              <TableBody>
                {(rowsPerPage > 0
                  ? troubleshooterDetails?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : []
                ).map((row: any, index: any) => {
                  const labelId = `detailed-view-table-${index}`;

                  return (
                    <TableRow tabIndex={-1} key={row._id}>
                      {/* <TableCell
                        padding="checkbox"
                        className={classes.tableCells}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row._id}
                      </TableCell>
                      <TableCell align="center">
                        {row.metadata.browser.name}
                      </TableCell>
                      <TableCell align="center">
                        {row.metadata.browser.version}
                      </TableCell>
                      <TableCell align="center">
                        {row.metadata.os.name} {row.metadata.os.version}
                      </TableCell>
                      <TableCell align="center">
                        {row.tests.camera.status ? (
                          <DoneIcon className={classes.tickIcon} />
                        ) : (
                          <CloseIcon className={classes.crossIcon} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.tests.microphone.status ? (
                          <DoneIcon className={classes.tickIcon} />
                        ) : (
                          <CloseIcon className={classes.crossIcon} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.tests.network.status ? (
                          <DoneIcon className={classes.tickIcon} />
                        ) : (
                          <CloseIcon className={classes.crossIcon} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.tests.browser.status ? (
                          <DoneIcon className={classes.tickIcon} />
                        ) : (
                          <CloseIcon className={classes.crossIcon} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {moment(row.createdAt).format('D,MMM,YYYY,hh:mm A')}
                      </TableCell>
                      {/* <TableCell
                        align="center"
                        className={clsx(
                          isItemSelected && classes.selectedRowCel
                        )}
                      >
                        See more
                      </TableCell> */}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            count={troubleshooterDetails?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              MenuProps: { classes: { paper: classes.dropdown } },
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            className={clsx(classes.paginationIcons, classes.paperTextDark)}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default memo(withStyles(styles)(DetailedView));
