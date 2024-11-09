import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const notificationRouter = createTRPCRouter({
  // new: protectedProcedure.input(z.object({
  // }))
});
