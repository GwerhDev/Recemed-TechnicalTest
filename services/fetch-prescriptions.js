import { getCookie } from "../utils/getCookie";

export const getPrescriptions = async () => {
  const token = getCookie('token') || '';

  const response = await fetch(`http://rec-staging.recemed.cl/api/patients/prescriptions?page=${1}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const { data } = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Error fetching data');
  }

  return data;
};