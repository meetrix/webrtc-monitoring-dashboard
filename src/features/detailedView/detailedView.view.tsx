/* eslint-disable no-irregular-whitespace */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useEffect, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import {
  ButtonProps,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import clsx from 'clsx';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import styles from './detailedView.styles';
// import Table from '../../components/Table';

export interface ICallStatsView
  extends WithStyles<ButtonProps & typeof styles> {
  callStatList: any;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
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
}

type Order = 'asc' | 'desc';

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
  {
    id: 'seeMore',
    headerName: '',
    flex: 1,
  },
];
interface EnhancedTableProps1 extends WithStyles<ButtonProps & typeof styles> {
  numSelected: number;
  // eslint-disable-next-line react/require-default-props
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead1(props: EnhancedTableProps1) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    classes,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            // inputProps={{
            //   'aria-label': 'select all desserts',
            // }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            // align={column.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === column.id ? order : false}
            align="center"
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              //   onClick={createSortHandler(column.id)}
              className={classes.sortIcon}
            >
              {column.headerName}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useSortableData = (
  troubleshooterDetails: any,
  config: { key: any; direction: string }
) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    const sortableItems = [...troubleshooterDetails];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [troubleshooterDetails, sortConfig]);

  const requestSort = (key: any) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { troubleshooterDetails: sortedItems, requestSort, sortConfig };
};

// const useSortableData1 = (
//   res: any
//   //   config: { key: any; direction: string }
// ) => {
//   //   const data } = res;
//   const item1 = [...res].sort((a, b) => {
//     return b.metadata?.browser?.name - a?.metadata?.browser?.name;
//   });

//   return { item1 };
// };

const CallStats: React.FC<ICallStatsView> = ({
  classes,
  callStatList,
}: ICallStatsView) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('createdAt');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [configTypes, setConfigTypes] = useState<string>('testId');
  const { troubleshooterDetails, requestSort, sortConfig } = useSortableData(
    callStatList && callStatList.length > 0 ? callStatList : [],
    {
      key: orderBy,
      direction: 'ascending',
    }
  );
  const x = ['62b90dafbcff3d4b1c9593bd', '62b94c57bcff3d4b1c95946b'];
  console.log('====================================');
  console.log(x.sort());
  console.log('====================================');

  const staticConfigData = (value: string) => {
    switch (value) {
      case '_id':
        // requestSort('_id');
        setOrderBy('_id');
        break;
      case 'createdAt':
        // requestSort('createdAt');
        setOrderBy('createdAt');
        break;
        //   case 'shared-secret':
        //     requestSort('_id');
        break;
      default:
        break;
    }
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = troubleshooterDetails?.map((n: any) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setConfigTypes(event.target.value as string);
    staticConfigData(event.target.value as string);
    // setOrderBy(event.target.value as string);
  };
  console.log('====================================');
  console.log(rowsPerPage);
  console.log('====================================');

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  //   const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - callStatList?.length) : 0;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={5} lg={5}>
          <div className={classes.titleText}>
            Troubleshooter &gt; Detailed View
          </div>
        </Grid>
        <Grid item sm={7} lg={7}>
          <div className={classes.titleText}>Sort by:</div>
          <Box>
            <Select
              key={configTypes}
              value={configTypes}
              onChange={handleChange}
              displayEmpty
              inputProps={{
                'aria-label': 'Without label',
              }}
              //   className={clsx(
              //     classes.paperTextDark,
              //     classes.configTypesDropdown
              //   )}
              variant="outlined"
            >
              <MenuItem
                value="_id"
                // className={classes.paperTextDark}
                key="testId"
              >
                Test ID
              </MenuItem>
              <MenuItem
                value="createdAt"
                // className={classes.paperTextDark}
                key="dateConnected"
              >
                Date Connected
              </MenuItem>
              <MenuItem
                value="browserVersion"
                // className={classes.paperTextDark}
                key="browserVersion"
              >
                Browser Version
              </MenuItem>
            </Select>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }} className={classes.paper}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer className={classes.tableCells}>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead1
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                // onRequestSort={handleRequestSort}
                rowCount={troubleshooterDetails?.length}
                classes={classes}
              />
              <TableBody>
                {(rowsPerPage > 0
                  ? troubleshooterDetails?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : []
                ).map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      className={clsx(
                        classes.tableRow,
                        isItemSelected && classes.selectedRow
                      )}
                    >
                      <TableCell
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
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className={clsx(
                          isItemSelected && classes.selectedRowCel
                        )}
                      >
                        {row._id}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={clsx(
                          isItemSelected && classes.selectedRowCel
                        )}
                      >
                        {row.metadata.browser.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={clsx(
                          isItemSelected && classes.selectedRowCel
                        )}
                      >
                        {row.metadata.browser.version}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={clsx(
                          isItemSelected && classes.selectedRowCel
                        )}
                      >
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
                      <TableCell
                        align="center"
                        className={clsx(
                          isItemSelected && classes.selectedRowCel
                        )}
                      >
                        {moment(row.createdAt).format('D,MMM,YYYY,hh:mm A')}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={clsx(
                          isItemSelected && classes.selectedRowCel
                        )}
                      >
                        See more
                      </TableCell>
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
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default memo(withStyles(styles)(CallStats));
