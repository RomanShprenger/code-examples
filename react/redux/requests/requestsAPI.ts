import { domain, apiVersion, getHeadersForLocal } from 'api';
import axios from 'axios';

const url = `${domain}/${apiVersion}`;
const server = axios.create({ baseURL: url });

export async function fetchRequests(token) {
  const result = await server.get('/requests', {
    headers: {
      Authorization: `Bearer ${token}`,
      ...getHeadersForLocal(),
    },
  });

  return result.data;
}

export function updateDecisionRequest(id, decision) {
  // id: string, decision: string (approve, deny)
  const data = { decision };

  fetch(`${url}/requests/${id}/decide`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });
}
