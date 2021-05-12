export default {
  jwt: {
    secret: process.env.NODE_ENV !== 'test' ? process.env.APP_SECRET : 'test',
    expires_in: '15m',
    secret_refresh_token:
      process.env.NODE_ENV !== 'test'
        ? process.env.APP_SECRET_REFRESH_TOKEN
        : 'test',
    expires_in_refresh_token: '30d',
    expires_refresh_token_days: 30,
  },
};
