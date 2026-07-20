import { auth } from "@/lib/auth";
import { toNextRouteHandler } from "better-auth/next-routes";

export const { GET, POST } = toNextRouteHandler(auth.handler);
