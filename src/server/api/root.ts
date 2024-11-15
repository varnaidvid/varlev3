import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { competitionRouter } from "./routers/competition";
import { schoolRouter } from "./routers/school";
import { coachRouter } from "./routers/coach";
import { teamsRouter } from "./routers/team";
import { technologyRouter } from "./routers/technology";
import { notificationRouter } from "./routers/notification";
import { categoryRouter } from "./routers/category";
import { subCategoryRouter } from "./routers/sub-category";
import { organizerRouter } from "./routers/organizer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  competition: competitionRouter,
  school: schoolRouter,
  coach: coachRouter,
  team: teamsRouter,
  technology: technologyRouter,
  notification: notificationRouter,
  category: categoryRouter,
  subCategory: subCategoryRouter,
  organizer: organizerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
