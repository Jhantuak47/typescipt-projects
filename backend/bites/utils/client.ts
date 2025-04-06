import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;


export async function initalizeRedis(): Promise<RedisClientType> {

    if (!client) {
        client = createClient();

        client.on("error", error => {
            console.error(error);
            process.exit(1);
        });

        client.on("connect", () => {
            console.log("Redis connected");
        });

        await client.connect();
    }

    return client;
}