import { toNextJsHandler } from "better-auth/next-js";

export function toNextRouteHandler(handler: any) {
  return toNextJsHandler(handler);
}
