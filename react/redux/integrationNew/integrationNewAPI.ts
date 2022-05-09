import { domain, apiVersion, getHeadersForLocal } from 'api';
import axios from 'axios';

const url = `${domain}/${apiVersion}`;
const server = axios.create({ baseURL: url });

export async function fetchIntegrationsList(token) {
  let result = await server.get('/integrations', {
    headers: {
      Authorization: `Bearer ${token}`,
      ...getHeadersForLocal(),
    },
  });
  return result.data;
}

export async function fetchIntegrationSchema(service) {
  let result = await server.get('/integrations', {
    headers: {
      Authorization: `Bearer ${token}`,
      ...getHeadersForLocal(),
    },
  });
  return result[service];
}

export async function createIntegration(integration, token) {
  const result = await server.post('/integrations', integration, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...getHeadersForLocal(),
    },
  });
  return {
    ...result.data,
    status: result.status,
  };
}
