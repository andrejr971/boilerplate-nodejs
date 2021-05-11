export default {
  jwt: {
    secret: process.env.NODE_ENV !== 'test' ? process.env.APP_SECRET : 'test',
    expiresIn: '1d',
  },
};
