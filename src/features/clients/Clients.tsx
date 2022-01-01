import React, { useState } from 'react';
import { useListActiveClientsQuery } from '../../services/api';

export const Clients = () => {
  const { data, error, isLoading } = useListActiveClientsQuery('meetrix.io');
  if (!data) {
    return <p>No active clients</p>;
  }

  return (
    <div>
      <p> Test </p>
    </div>
  );
};

export default Clients;
