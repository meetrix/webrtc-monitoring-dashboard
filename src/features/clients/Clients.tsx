import React from 'react';
import { useListActiveClientsQuery } from '../../services/apiService/endpoints/clientEndpoints';

export const Clients: React.FC = () => {
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
