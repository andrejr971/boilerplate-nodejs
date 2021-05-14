export default {
  jwt: {
    secret: process.env.NODE_ENV !== 'test' ? process.env.APP_SECRET : 'test',
    expires_in: 60 * 15, // 15 min
    secret_refresh_token:
      process.env.NODE_ENV !== 'test'
        ? process.env.APP_SECRET_REFRESH_TOKEN
        : 'test',
    expires_in_refresh_token: 60 * 60 * 24 * 30, // 30 days
    expires_refresh_token_days: 30, // 30 days
  },
};
