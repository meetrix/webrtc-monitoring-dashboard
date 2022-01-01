import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectPeers } from './debuggerSlice';
import PeerComponent from './PeerComponent';

export const Debugger: React.FC = () => {
  const peers = useAppSelector(selectPeers);
  console.log('----- peers ----', peers);
  return (
    <div>
      {peers?.map((peer) => (
        <PeerComponent peer={peer} />
      ))}
    </div>
  );
};

export default Debugger;
