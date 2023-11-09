import 'dotenv/config';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import cors, { CorsRequest } from 'cors';

import { connectDB } from './db/index.js';
import schema from './schema/index.js';

export interface MyContext {
  token?: string;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  schema: schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await connectDB().catch(console.dir);
await server.start();

app.use(cookieParser());
app.use(
  '/graphql',
  cors<CorsRequest>({
    origin: 'http://localhost:3000',
    credentials: true
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token })
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
