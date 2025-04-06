import express from "express";
import type { NextFunction, Request, Response } from "express";
import { validate } from "../middlewares/validate.js";
import { RestaurantSchema, type Restaurant } from "../schemas/restaurant.js";
import { initalizeRedis } from "../utils/client.js";
import { nanoid } from "nanoid";
import { restaurantKeyById } from "../utils/keys.js";
import type { RedisClientType } from "@redis/client";
import { successResponse } from "../utils/responses.js";
const router = express.Router();

router.post('/', validate(RestaurantSchema) as any, async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as Restaurant;
    try {
        const client = await initalizeRedis();
        const id: string = nanoid();
        const restaurantKey: string = restaurantKeyById(id);
        const hashData = {
            id,
            name: data.name,
            location: data.location
        }

        const addResult = await client.hSet(restaurantKey, hashData);
        console.log(`Added ${addResult} fields`);

        return successResponse(res, hashData, "Added new restaurant");
    } catch (error) {
        next(error);
    }
})

export default router;