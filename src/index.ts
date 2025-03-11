import { Hono } from 'hono'
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import D1test from "./routes/D1test";
import FirestoreTest from "./routes/FirestoreTest";

const app = new Hono()

app.use(logger());
app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('/api' , FirestoreTest);

app.onError((err, c) => {
  return c.json(
      {
        message: err.message,
      },
      500,
  );
});

export default app;
