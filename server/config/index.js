import dotenv from 'dotenv';
dotenv.config();

// Dejaré los datos expuestos para los fines de revisión,
// sin embargo son APIs públicas y/o datos no sensibles.
export const port = process.env.PORT || 3000;
export const environment = process.env.NODE_ENV || 'development';
export const apiRecemed = process.env.API_RECEMED || 'http://rec-staging.recemed.cl/api';