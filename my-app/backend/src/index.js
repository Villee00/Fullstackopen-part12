import { ApolloServer } from "apollo-server-express";

import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginDrainHttpServer,
} from "apollo-server-core";
import mongoose from "mongoose";
import express from "express";
import schema from "./graphql/schema.js";
import http from "http";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const serverStart = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((error) => {
      console.log(`ERROR: mongodb connenction, ${error}`);
    });

  const app = express();
  const httpServer = http.createServer(app);

  let server;
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));

    server = new ApolloServer({
      ...schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({ app });
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
    });
  } else {
    server = new ApolloServer({
      ...schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
  }

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
};

serverStart();
