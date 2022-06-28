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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import clsx from 'clsx';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import styles from './detailedView.styles';

interface IDetailedView extends WithStyles<ButtonProps & typeof styles> {
  detailViewList: any;
}
type TableHeadProps = WithStyles<ButtonProps & typeof styles>;

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const columns = [
  { id: 'id', headerName: 'Test ID', flex: 1 },
  { id: 'browserName', headerName: 'Browser Name', flex: 1 },
  { id: 'browserVersion', headerName: 'Browser Version', flex: 1 },
  {
    id: 'operatingSystem',
    headerName: 'Operating System',
    flex: 1,
  },
  {
    id: 'camera',
    headerName: 'Camera',
    flex: 1,
  },
  {
    id: 'mic',
    headerName: 'Mic',
    flex: 1,
  },
  {
    id: 'network',
    headerName: 'Network',
    flex: 1,
  },
  {
    id: 'browser',
    headerName: 'Browser',
    flex: 1,
  },
  {
    id: 'connectedAt',
    headerName: 'Connected At',
    flex: 1,
  },
  //   {
  //     id: 'seeMore',
  //     headerName: '',
  //     flex: 1,
  //   },
];

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

// Table header
const DetailedViewTableHead: React.FC<TableHeadProps> = ({
  classes,
}: TableHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox"> */}
        {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          /> */}
        {/* </TableCell> */}
        {columns.map((column) => (
          <TableCell key={column.id} align="center">
            <TableSortLabel className={classes.sortIcon}>
              {column.headerName}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

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

const DetailedView: React.FC<IDetailedView> = ({
  classes,
  detailViewList,
}: IDetailedView) => {
  const [orderBy, setOrderBy] = useState<string>('_id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderValue, setOrderValue] = useState<string>('_id');
  const [sortDirection, setSortDirection] = useState<string>('ascending');
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
          // if filterPass comes back `false` the row is filtered out
          return filterPass;
        })
        .map((item: any) => {
          tempDetailList.push(item);
        });
      setInitialDetailList(tempDetailList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, detailViewList, sortDirection, startDate, endDate]);

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

  const sortValue = (value: string) => {
    switch (value) {
      case '_id':
        setOrderBy('_id');
        break;
      case 'createdAt':
        setOrderBy('createdAt');
        break;
      case 'browserVersion':
        setOrderBy('browserVersion');
        break;
      default:
        break;
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setOrderValue(event.target.value as string);
    sortValue(event.target.value as string);
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

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={5} lg={3}>
          <div className={classes.titleText}>
            Troubleshooter &gt; Detailed View
          </div>
        </Grid>
        <Grid item sm={5} lg={5} className={classes.datePickerWrapper}>
          <div style={{ display: 'flex', paddingRight: '10px' }}>
            <div className={classes.paperTextDark}>From: &nbsp;</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="dd/MM/yyyy"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                maxDate={new Date()}
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
        <Grid item sm={7} lg={4}>
          <div style={{ display: 'flex' }}>
            <div className={classes.paperTextDark}>Sort by: &nbsp;</div>
            <Box>
              <Select
                key={orderValue}
                value={orderValue}
                onChange={handleChange}
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
