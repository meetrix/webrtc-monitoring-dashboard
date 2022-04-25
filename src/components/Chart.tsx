import React, { memo } from 'react';
import { ButtonProps, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';

const styles = (theme: Theme) => {
  return createStyles({
    root: {},
  });
};

export interface ChartComponentProps
  extends WithStyles<ButtonProps & typeof styles> {
  id?: string;
  data: any;
}

export const ChartComponent: React.FC<ChartComponentProps> = ({
  classes,
  ...otherProps
}: ChartComponentProps) => {
  // let data;

  // useEffect(() => {
  //   data = generateData(2.5, 12, 0.5);
  // }, []);

  return (
    <div>
      <div>Chart</div>
    </div>
  );
};

export default memo(withStyles(styles)(ChartComponent));
