import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { TrackReportExtended } from '@meetrix/webrtc-monitoring-common-lib';

function Row(props: { track: TrackReportExtended }) {
  const { track } = props;
  const { mimeType, jitter, packetsLost, packetsReceived } = track;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell component="th" scope="row">
          {track.kind}
        </TableCell>
        <TableCell align="right">{mimeType}</TableCell>
        <TableCell align="right">{jitter}</TableCell>
        <TableCell align="right">
          {packetsLost && packetsReceived
            ? (packetsLost * 100) / (packetsReceived + packetsLost)
            : 'undefined'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface TracksPropType {
  type: 'inbound' | 'outbound';
  tracks: TrackReportExtended[];
}
export const Tracks: React.FC<TracksPropType> = (props: TracksPropType) => {
  const { tracks, type } = props;
  return (
    <Box>
      <TableContainer component={Paper}>
        <Typography
          variant="h6"
          sx={{
            margin: '1rem',
          }}
        >
          {`${type === 'inbound' ? 'Inbound' : 'Outbound'} Tracks`}
        </Typography>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {/* <TableCell /> */}
              <TableCell>Type</TableCell>
              <TableCell align="right">Mime&nbsp;Type</TableCell>
              <TableCell align="right">Jitter</TableCell>
              <TableCell align="right">Packet&nbsp;Loss&nbsp;(%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track) => (
              <Row key={track.id} track={track} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tracks;
