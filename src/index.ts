import 'dotenv/config';
import process from 'process';
import Application from './application.ts';
import { router } from './user-routes.ts';

const PORT = process.env.PORT || '5000';

const userRouter = router;

const app = new Application();

app.addRouter(userRouter);

app.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}...`),
);
