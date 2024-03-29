import "reflect-metadata";
import "dotenv/config";
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from "cors";
import "express-async-errors";
import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";


import swaggerFile from '../../../swagger.json';
import { router } from './routes';
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

import createConnection from '@shared/infra/typeorm';
import '@shared/container';
import { AppError } from "@shared/errors/AppError";
import { AppConfig } from "aws-sdk";


createConnection();

const app = express(); 

//app.use(rateLimiter);

Sentry.init({
    dsn: process.env.SENTRY_DNS,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, request: Request, response: Response, next: NextFunction ) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({ 
            message: err.message
        })
    }
    return response.status(500).json({ 
        status: "error",
        message: `Internal server error - ${err.message}`,
    })
})

export { app }

