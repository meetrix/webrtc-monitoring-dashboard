import React, { memo } from 'react';
import clsx from 'clsx';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { ButtonProps, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';

const styles = (theme: Theme) => {
  return createStyles({
    root: {},
  });
};

export interface TableComponentProps
  extends WithStyles<DataGridProps & typeof styles> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  _id?: string;
  rows: Array<any>;
  getRowId?: any;
  columns: Array<any>;
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
  disableColumnFilter?: boolean;
  onRowClick?: any;
  getRowClassName?: any;
  hideFooterSelectedRowCount?: boolean;
  rowsPerPageOptions?: any;
  onPageSizeChange?: any;
  pageSize?: any;
  paginationMode?: 'client' | 'server';
  page?: any;
  onPageChange?: any;
  rowCount?: number;
  loading?: boolean;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  classes,
  ...otherProps
}: TableComponentProps) => {
  return <DataGrid className={classes.root} pagination {...otherProps} />;
};

export default memo(withStyles(styles)(TableComponent));
