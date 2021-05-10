import app from './app';

app.listen(process.env.PORT, () => {
  console.log(`🚀 Started server on port ${process.env.PORT}`);
});
