import { Hono } from "hono";    
import { handle } from "hono/vercel";
import auth from  "@/features/auth/server/route"; 
import workspaces from "@/features/workspaces/server/route";
import member from "@/features/members/server/route";
import projects from "@/features/projects/server/route";



const app = new Hono().basePath("/api/");

const routes = app
    .route("/auth", auth)
    .route("/workspaces", workspaces)
    .route("/member", member)
    .route("/projects", projects)
    
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;