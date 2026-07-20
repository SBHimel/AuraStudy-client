import { jwtClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export type UserRole = "client" | "freelancer" | "admin";
export type UserPlan = "free" | "pro";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    jwtClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

// Derive the base user type from the resolved useSession hook return value
type BaseSession = NonNullable<
  ReturnType<typeof authClient.useSession>["data"]
>;
type BaseUser = BaseSession["user"];

// Extend with the custom additionalFields defined in auth.ts
export type AuthUser = BaseUser & {
  role: UserRole;
  plan: UserPlan;
};
