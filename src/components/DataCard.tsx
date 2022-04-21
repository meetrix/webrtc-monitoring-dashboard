import React from 'react';
import { Paper, Typography, Box, TypographyProps } from '@mui/material';

type EntryElementType = string | JSX.Element;

interface Entry {
  key: string;
  value: EntryElementType;
}

interface DataSet {
  title: string;
  body: Entry[];
  type?: string;
}

export interface DataCardComponentPropsType {
  data: DataSet[];
}

export const DataCard: React.FC<DataCardComponentPropsType> = ({
  data,
}: DataCardComponentPropsType) => {
  const renderStringOrComponent = (
    stringOrComponent: EntryElementType,
    props?: TypographyProps
  ) => {
    return typeof stringOrComponent === 'string' ? (
      <Typography variant="body2" {...props}>
        {stringOrComponent}
      </Typography>
    ) : (
      stringOrComponent
    );
  };
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #00000040',
      }}
    >
      {data.map(({ title, body, type }) => {
        return (
          <Box
            key={title}
            sx={{
              padding: '1rem',
            }}
            rowGap="1rem"
          >
            {renderStringOrComponent(title, { variant: 'h6' })}
            {body.map(({ key, value }) => {
              return (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    justifyItems: 'start',
                    marginTop: '0.25rem',
                  }}
                >
                  {renderStringOrComponent(key, {
                    fontWeight: value ? '' : 'bold',
                    color: value ? '' : 'darkgray',
                  })}
                  {renderStringOrComponent(value, { color: 'darkgray' })}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Paper>
  );
};

export default DataCard;
