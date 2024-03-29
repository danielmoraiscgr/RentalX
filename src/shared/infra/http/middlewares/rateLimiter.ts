import * as redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
         host: process.env.REDIS_HOST,
         port: Number(process.env.REDIS_PORT),
         sessionTimeout: 20,
    }   
});

const limiter  = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 15, // 10 requests
    duration: 5, // per 1 second by IP
  });

export default async function rateLimiter(
    request: Request, 
    response: Response, 
    next: NextFunction
): Promise<void> {
    try {

        await redisClient.connect(); 
         
        await limiter.consume(request.ip);

        return next(); 

    } catch (err) {
        throw new AppError("Too many requests !",429)
    }
}