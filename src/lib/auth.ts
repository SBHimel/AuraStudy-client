import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { client, db } from "./db";

// AuraStudy প্রজেক্টের উপযোগী রোলস
export type UserRole = "student" | "instructor" | "admin";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "student", // student, instructor, admin-এ পরিবর্তন করা হলো
        required: false,
      },
      plan: {
        type: "string",
        defaultValue: "free", // free, pro (এটি আগের মতোই পারফেক্ট আছে)
        required: false,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 60, // 24 hours in minutes
    },
  },
  plugins: [jwt()],
});