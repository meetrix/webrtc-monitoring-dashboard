import React, { memo } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import { ButtonProps } from '@mui/material';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import styles from './detailedView.styles';

type TableHeadProps = WithStyles<ButtonProps & typeof styles>;

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

export default memo(withStyles(styles)(DetailedViewTableHead));
