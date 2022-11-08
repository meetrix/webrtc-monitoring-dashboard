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
  id?: string;
  rows: Array<any>;
  columns: Array<any>;
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
  disableColumnFilter?: boolean;
  onRowClick?: any;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  classes,
  onClick,
  id,
  rows,
  columns,
  checkboxSelection,
  disableSelectionOnClick,
  disableColumnFilter,
  onRowClick,
  ...otherProps
}: TableComponentProps) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      className={classes.root}
      disableColumnFilter={disableColumnFilter}
      checkboxSelection={checkboxSelection}
      disableSelectionOnClick={disableSelectionOnClick}
      onRowClick={onRowClick}
    />
  );
};

export default memo(withStyles(styles)(TableComponent));
