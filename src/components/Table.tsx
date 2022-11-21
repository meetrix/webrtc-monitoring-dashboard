import React, { memo } from 'react';
import clsx from 'clsx';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonProps, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';

const styles = (theme: Theme) => {
  return createStyles({
    root: {},
  });
};

export interface TableComponentProps
  extends WithStyles<ButtonProps & typeof styles> {
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
}

export const TableComponent: React.FC<TableComponentProps> = ({
  classes,
  onClick,
  rows,
  getRowId,
  columns,
  checkboxSelection,
  disableSelectionOnClick,
  disableColumnFilter,
  onRowClick,
  getRowClassName,
  hideFooterSelectedRowCount,
  ...otherProps
}: TableComponentProps) => {
  return (
    <DataGrid
      rows={rows}
      getRowId={getRowId}
      columns={columns}
      className={classes.root}
      disableColumnFilter={disableColumnFilter}
      checkboxSelection={checkboxSelection}
      disableSelectionOnClick={disableSelectionOnClick}
      onRowClick={onRowClick}
      getRowClassName={getRowClassName}
      hideFooterSelectedRowCount={hideFooterSelectedRowCount}
    />
  );
};

export default memo(withStyles(styles)(TableComponent));
