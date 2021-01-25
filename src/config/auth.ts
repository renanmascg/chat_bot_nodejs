import path from 'path';

const frontendFolder = path.resolve(
  __dirname,
  '..',
  '..',
  'assets',
  'frontend_assets',
);

export default {
  jwt: {
    secret: process.env.APP_SECRET ?? '',
    expiresIn: '1d',
  },
  directory: frontendFolder,
};
