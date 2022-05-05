import React from 'react';
import { Paper, Typography, Box, TypographyProps } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type EntryElementType = string | JSX.Element;

interface Entry {
  key: string;
  value?: EntryElementType;
}

interface DataSet {
  event: string;
  body: Entry[];
  type?: string;
}

interface IRows {
  type: string;
  mime: string;
  jitter: string | number;
  packetLoss: string | number;
}

interface TableData {
  event: string;
  body: any;
}

export interface DataCardComponentPropsType {
  data?: DataSet[];

  tableData?: any;
}

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

export const DataCard: React.FC<DataCardComponentPropsType> = ({
  data,
  tableData,
}: DataCardComponentPropsType) => {
  if (tableData)
    return (
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #00000040',
          width: '100%',
          p: 2,
        }}
      >
        {renderStringOrComponent(tableData.event, { variant: 'h6' })}
        <TableContainer>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>TYPE</TableCell>
                <TableCell>MIME TYPE</TableCell>
                <TableCell>JITTER</TableCell>
                <TableCell>PACKET LOSS(%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.body.map((row: any) => (
                <TableRow
                  key={row.type}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.type}
                  </TableCell>
                  <TableCell>{row.mime}</TableCell>
                  <TableCell>{row.jitter}</TableCell>
                  <TableCell>{row.packetLoss}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #00000040',
        flexGrow: 1,
      }}
    >
      {data?.map(({ event, body }) => {
        return (
          <Box
            key={event}
            sx={{
              padding: '1rem',
            }}
            rowGap="1rem"
          >
            {renderStringOrComponent(event, { variant: 'h6' })}

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
                  {value &&
                    renderStringOrComponent(value, { color: 'darkgray' })}
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
