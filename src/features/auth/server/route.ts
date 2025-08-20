import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";


const app = new Hono()
    .post(
        "/login",
        zValidator("json", z.object({
            email: z.string().email(),
            password: z.string(),
        })), 
        (c) => {
        return c.json({ success: "ok"})
    })



export default app;