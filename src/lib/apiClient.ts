import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
