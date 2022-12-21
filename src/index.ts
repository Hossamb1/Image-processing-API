import main from './main';
import routes from './routes/index';
import express from 'express';

const app: express.Application = express();
app.use(routes);
const port: number = 5000;

app.listen(port, async (): Promise<void> => {
  await main.createNewPath();
  console.log(`listening to ${port}`);
});

export default app;
